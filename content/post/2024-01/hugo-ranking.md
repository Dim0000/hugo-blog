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
thumbnail: /images/hugo.webp
---

今回は**Hugo**と**Google Analytics**で各記事のPV数のランキングを取得する方法を紹介します。なお、ランキング取得スクリプトは**Docker**で動かす想定です。

<!--more-->

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

サービスアカウント名とサービスアカウントIDを入力し、完了ボタンをクリックします。

{{< luminous src="/images/hugo-ranking-05.png" caption="Google Analytics Data APIの設定5">}}

{{< luminous src="/images/hugo-ranking-06.png" caption="Google Analytics Data APIの設定6">}}

サービスアカウントを作成後、秘密鍵のjsonファイルのダウンロードを行います。サービスアカウントの画面から鍵を追加していきます。

{{< luminous src="/images/hugo-ranking-07.png" caption="Google Analytics Data APIの設定7">}}

{{< luminous src="/images/hugo-ranking-08.png" caption="Google Analytics Data APIの設定8">}}

ダウンロードしたファイルはデータ取得で使用するので、ブログフォルダ内の`.gcp`内に配置します。Gitで管理している場合は、間違って公開してしまわないよう`.gitignore`に追記しておく必要があります。

{{< code lang="plaintext" title=".gitignore" >}}
.gcp
{{< /code >}}

## Google Analytics

ここから、Google Analyticsでサービスアカウントの権限設定を行います。管理画面の「プロパティのアクセス管理」をクリックします。

{{< luminous src="/images/hugo-ranking-09.png" caption="Google Analyticsの設定1">}}

右上の「+」ボタンからユーザーを追加をクリックします。

{{< luminous src="/images/hugo-ranking-10.png" caption="Google Analyticsの設定2">}}

作成したサービスアカウントIDをメールアドレス欄に入力し、標準の役割は閲覧者に設定します。

{{< luminous src="/images/hugo-ranking-11.png" caption="Google Analyticsの設定3">}}

## PVランキングを取得するスクリプトの作成

ここからPVランキングを取得するスクリプトの作成していきます。今回はDockerを使用しますので、新たに`compose.create-ranking.yml`を作成します。

{{< code lang="yml" title="compose.create-ranking.yml" >}}
volumes:
  node-modules:

services:
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
      node scripts/create-ranking.js"
{{< /code >}}

実際にPVデータを取得する`analytics-api.js`と表示用にjsonファイルを作成する`create-ranking.js`とを`scripts`フォルダ内に配置します。

{{< code lang="JavaScript" title="scripts/analytics-api.js" >}}
// Google Analytics 4 property ID
propertyId = 'XXXXXXXXX'; //プロパティID

// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
process.env.GOOGLE_APPLICATION_CREDENTIALS = `.gcp/google-analytics_credentials.json`;

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

exports.runReport = async function () {
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
  return response;
}
{{< /code >}}

{{< code lang="JavaScript" title="scripts/create-ranking.js" >}}
const { runReport } = require('./analytics-api.js');

const fs = require('fs');
const currentDate = new Date().toISOString();

async function main() {
  try {
    const response = await runReport();

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
          createdAt: currentDate
        },
        null,
        4
      )
    )
  } catch (error) {
    console.error('Error running report:', error);
  }
}

main();
{{< /code >}}

PVデータの取得は以下のコマンドで実行できます。

{{< code lang="powershell" title="ターミナル" >}}
$ docker compose -f compose.create-ranking.yml run --rm node # PVランキング取得
{{< /code >}}

## Hugoでランキングを表示

Hugo上では以下の様にしてPVデータを取得できます。例として、当ブログのメニューバーに表示させているpartialを紹介します。

{{< code lang="html" title="ranking.html" >}}
{{ $ranking := slice }}
{{ range $item := sort .Site.Data.ranking.items "pv" "desc" }}
  {{ $ranking = $ranking | append (dict "page" $item.pagePath) }}
{{ end }}

<div class="widget-recent widget">
  <h4 class="widget__title">人気記事</h4>
  <div class="widget__content">
    <ul class="widget__list">
      {{ range first 5 $ranking }}
        {{ $url := replace .page "/" ""}}
        {{ $page := $.Site.GetPage $url }}
        <li class="widget__item"><a class="widget__link" href="{{ $page.Permalink  }}" target="_blank">{{ $page.Title }}</a></li>
      {{ end }}
    </ul>
  </div>
</div>
{{< /code >}}

## Github Actionsの設定

Github Actionsのプッシュ時の自動デプロイ処理の前にランキング取得処理を実行したいので、`deploy.yml`を以下の様に書き換えました。また、1週間に一度自動でランキング取得とデプロイ処理が実行されるように変更します。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/hugo-github" >}}</li>
</ul>
{{< /box >}}

{{< code lang="yml" title="deploy.yml" >}}
name: deploy

on:
  push:
    branches:
      - main
  schedule:
    - cron: '0 0 * * 0'

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      id-token: write
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0 # enableGitInfoでの取得用
      - name: Setup npm
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: ${{ runner.os }}-node-
      - name: npm Install
        run: npm ci
      - name: Create Ranking
        env:
          GOOGLE_ANALYTICS_CREDENTIALS: ${{ secrets.GOOGLE_ANALYTICS_CREDENTIALS }}
        run: |
          mkdir .gcp
          echo "$GOOGLE_ANALYTICS_CREDENTIALS" > .gcp/google-analytics_credentials.json
          node scripts/create-ranking.js          
      - name: Commit and Push
        run: |
          git branch
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git commit -am "Create Ranking"
          git push origin HEAD
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: "latest"
          extended: true     
      - name: Build Hugo
        run: hugo --minify --buildFuture
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: ap-northeast-1
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/blog_github_action_role # ロール名
          role-session-name: GitHubActions-${{ github.run_id }}
          role-duration-seconds: 900
      - name: Upload files to the production website with the AWS CLI
        run: |
          echo "uploding to s3 ..."
          aws s3 sync public s3://${{ secrets.S3_BUCKET }}/ --size-only --delete
          aws cloudfront create-invalidation --region ap-northeast-1 --distribution-id ${{ secrets.DISTRIBUTION_ID }} --paths "/*"
{{< /code >}}

GitHubのSecrets設定で、`GOOGLE_ANALYTICS_CREDENTIALS`に先ほどダウンロードした鍵の内容を設定します。

{{< luminous src="/images/hugo-github-02.png" caption="GitHub ActionsのSecrets設定">}}

また、自動デプロイ処理中でコミットとプッシュができるように、Actionsの設定の「Workflow permissions」を「Read and write permissions」に設定しておきましょう。

{{< luminous src="/images/hugo-ranking-12.png" caption="GitHub Actionsの書き込み設定">}}

これで、GitHubへのプッシュ時にランキングを取得してからデプロイするようになります。

* * *

今回はHugoでPVランキングを取得する方法を紹介しました。やはり、人気記事の一覧はブログサイトとしてはあった方が見栄えが良い気がしますね。以上で記事を終わりにします。

## 参考文献

* [アナリティクス Reporting API v4を使ってGoogle Analyticsのデータを取得する | DevelopersIO](https://dev.classmethod.jp/articles/ga-api-v4/)

* [Hugoで一週間のPV数順の人気記事を作る方法 | Hugoブログテーマ「Salt」](https://hugo-theme-salt.okdyy75.com/article/hugo/ranking/)