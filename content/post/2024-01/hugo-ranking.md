---
title: 【Hugo】PV数の人気記事のランキングを取得する
description: 今回はHugoとGoogle Analyticsで各記事のPV数のランキングを取得する方法を紹介します。なお、ランキング取得スクリプトはDockerで動かす想定です。
date: 2024-01-03
categories: 
  - 技術記事
tags: 
  - ブログ運営
  - Hugo
  - GitHub
  - Node.js
  - Docker
archives:
    - 2024/01
thumbnail: /images/hugo.png
---

今回は**Hugo**と**Google Analytics**で各記事のPV数のランキングを取得する方法を紹介します。なお、ランキング取得スクリプトは**Docker**で動かす想定です。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/wordpress-to-hugo" >}}</li>
</ul>
{{< /box >}}

## Google Analytics Data APIの設定

まず、各記事のPV数を取得するためにGoogle Analytics Data APIを設定していきます。GCPにログインし、APIライブラリからGoogle Analytics Data APIを有効にします。

{{< luminous src="/images/hugo-ranking-01.png" caption="Google Analytics Data APIの設定1">}}

{{< luminous src="/images/hugo-ranking-02.png" caption="Google Analytics Data APIの設定2">}}

次に、サービスアカウントを作成していきます。

{{< luminous src="/images/hugo-ranking-03.png" caption="Google Analytics Data APIの設定3">}}

{{< luminous src="/images/hugo-ranking-04.png" caption="Google Analytics Data APIの設定4">}}

{{< luminous src="/images/hugo-ranking-05.png" caption="Google Analytics Data APIの設定5">}}

{{< luminous src="/images/hugo-ranking-06.png" caption="Google Analytics Data APIの設定6">}}

続いて、鍵のダウンロードを行います。ダウンロードしたファイルはデータ取得で使用するので、ブログフォルダ内の`.gcp`内に配置します。

{{< luminous src="/images/hugo-ranking-07.png" caption="Google Analytics Data APIの設定7">}}

{{< luminous src="/images/hugo-ranking-08.png" caption="Google Analytics Data APIの設定8">}}

## Google Analytics

ここから、Google Analyticsで権限の設定を行います。

{{< luminous src="/images/hugo-ranking-09.png" caption="Google Analyticsの設定1">}}

{{< luminous src="/images/hugo-ranking-10.png" caption="Google Analyticsの設定2">}}

{{< luminous src="/images/hugo-ranking-11.png" caption="Google Analyticsの設定3">}}

## PVランキングを取得するスクリプトの作成

ここからPVランキングを取得するスクリプトの作成していきます。今回はDockerを使用しますので、`docker-compose.yml`に以下を記述しておきます。

{{< code lang="yml" title="docker-compose.yml" >}}
version: '3'

volumes:
  node-modules:
      
  node:
    image: node:latest
    working_dir: /node
    tty: true
    ports: 
    - '3000:3000'
    volumes:
      - .:/node
      - node-modules:/node/node_modules
    command: >
      bash -c "npm install &&
      npm install @google-analytics/data &&
      npm install dayjs"
{{< /code >}}

実際にPVランキングを取得するスクリプトを`scripts/create-ranking.js`に配置します。

{{< code lang="JavaScript" title="scripts/create-ranking.js" >}}
/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
propertyId = 'XXXXXXXXX'; //プロパティID

// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
process.env.GOOGLE_APPLICATION_CREDENTIALS = `.gcp/google-analytics_credentials.json`

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc.js')
const timezone = require('dayjs/plugin/timezone.js')
const fs = require('fs')
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.tz.setDefault('Asia/Tokyo')

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '8daysAgo',
        endDate: '1daysAgo',
      },
    ],
    dimensions: [
      {
        name: 'pagePath',
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
    ],
  });

  let rankings = []
  response.rows.forEach((row) => {
    rankings.push({
      pagePath: row.dimensionValues[0].value,
      pv: row.metricValues[0].value,
    })
  })
  fs.writeFileSync(
    'data/ranking.json',
    JSON.stringify(
      {
        items: rankings,
        createdAt: dayjs().toISOString(),
      },
      null,
      4
    )
  )
}

runReport();
{{< /code >}}

PVデータの取得は以下のコマンドで実行できます。

{{< code lang="powershell" title="ターミナル" >}}
$ docker-compose run node npm run create-ranking # PVランキング取得
{{< /code >}}

## Hugoでランキングを表示

Hugo上では以下の様にしてPVデータを取得できます。例としてメニューバーに表示

{{< code lang="html" title="ranking.html" >}}
{{ $ranking := slice }}
{{ range $item := sort .Site.Data.ranking.items "pv" "desc" }}
  {{ $ranking = $ranking | append (dict "page" $item.pagePath) }}
{{ end }}
{{< /code >}}

## Github Actionsの設定

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/hugo-github" >}}</li>
</ul>
{{< /box >}}

Github Actionsのプッシュ時の自動デプロイ処理と一緒に、ランキング取得処理も行いたいので、`s3_upload.yml`を以下の様に書き換えます。

{{< code lang="yml" title="s3_upload.yml" >}}
name: s3_upload

on:
  push:
    branches:
      - main
  schedule:
    - cron: '0 0 * * 0'

jobs:
  create-ranking: # ランキング生成
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - name: Setup npm
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
      - uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: |
                        ${{ runner.os }}-node-
      - name: npm Install
        run: |
                    npm ci
      - name: Create Ranking
        env:
          GOOGLE_ANALYTICS_CREDENTIALS: ${{ secrets.GOOGLE_ANALYTICS_CREDENTIALS }}
        run: |
          mkdir .gcp
          echo "$GOOGLE_ANALYTICS_CREDENTIALS" > .gcp/google-analytics_credentials.json
          npm run create-ranking          
      - name: Commit and Push
        run: |
          git branch
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git commit -am "Create Ranking"
          git push origin HEAD
  build: # Hugoビルド
    needs: create-ranking
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0 # enableGitInfoでの取得用
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "latest"
          extended: true     
      - name: Build Hugo
        run: hugo --minify --buildFuture
      - name: upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: my-artifact
          path: public
          retention-days: 1 # artifactsの保存期間
  deploy: # S3にデプロイ
    needs: build
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Download artifacts for build
        uses: actions/download-artifact@v4
        with:
          name: my-artifact
          path: public
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: ap-northeast-1
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/blog_github_action_role
          role-session-name: GitHubActions-${{ github.run_id }}
          role-duration-seconds: 900
      - name: Upload files to the production website with the AWS CLI
        run: |
          echo "uploding to s3 ..."
          aws s3 sync public s3://${{ secrets.S3_BUCKET }}/ --size-only --delete
          aws cloudfront create-invalidation --region ap-northeast-1 
          --distribution-id XXXXXXXXXXXXX --paths "/*"        
{{< /code >}}

`distribution-id`は自環境でのディストリビューションIDに置き換えて下さい。これで、GitHubへのプッシュ時にランキングを取得してからデプロイするようになります。

* * *

今回はHugoでPVランキングを取得する方法を紹介しました。以上で記事を終わりにします。

## 参考文献

* [アナリティクス Reporting API v4を使ってGoogle Analyticsのデータを取得する | DevelopersIO](https://dev.classmethod.jp/articles/ga-api-v4/)

* [Hugoで一週間のPV数順の人気記事を作る方法 | Hugoブログテーマ「Salt」](https://hugo-theme-salt.okdyy75.com/article/hugo/ranking/)