---
title: 【Hugo】PV数の人気記事のランキングを取得する【Node.js】
description: HugoとGoogle Analyticsで各記事のPV数のランキングをNode.jsで取得する方法を紹介します。
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

**Hugo**と**Google Analytics**で各記事のPV数のランキングを**Node.js**で取得する方法を紹介します。

<!--more-->

なお、Node.jsはDockerで動かす想定です。

{{< box "関連記事" >}}
* [](wordpress-to-hugo)
{{< /box >}}

## Google Analytics Data APIの設定

まず、各記事のPV数を取得するためにGoogle Analytics Data APIを設定していきます。GCPにログインし、APIライブラリからAPIを有効にします。

![Google Analytics Data APIの設定1](/images/hugo-ranking-01.png)

![Google Analytics Data APIの設定2](/images/hugo-ranking-02.png)

次に、サービスアカウントを作成していきます。

![Google Analytics Data APIの設定3](/images/hugo-ranking-03.png)

![Google Analytics Data APIの設定4](/images/hugo-ranking-04.png)

「サービスアカウント名」と「サービスアカウントID」を入力し、完了ボタンをクリックします。

![Google Analytics Data APIの設定5](/images/hugo-ranking-05.png)

![Google Analytics Data APIの設定6](/images/hugo-ranking-06.png)

サービスアカウントを作成後、秘密鍵のJSONファイルのダウンロードを行います。サービスアカウントの画面から鍵を追加していきます。

![Google Analytics Data APIの設定7](/images/hugo-ranking-07.png)

![Google Analytics Data APIの設定8](/images/hugo-ranking-08.png)

ダウンロードしたファイルはデータ取得で使用するので、ブログフォルダ内の`.gcp`内に配置します。

Gitで管理している場合は、間違って公開してしまわないよう`.gitignore`に追記しておく必要があります。

```plaintext {lineNos="inline", name=".gitignore"}
.gcp
```

## Google Analyticsの設定

ここから、Google Analyticsでサービスアカウントの権限設定を行います。管理画面の「プロパティのアクセス管理」をクリックします。

![Google Analyticsの設定1](/images/hugo-ranking-09.png)
右上の「+」ボタンからユーザーを追加をクリックします。

![Google Analyticsの設定2](/images/hugo-ranking-10.png)

作成したサービスアカウントIDをメールアドレス欄に入力し、標準の役割は「閲覧者」に設定します。

![Google Analyticsの設定3](/images/hugo-ranking-11.png)

## PVランキングを取得するスクリプトの作成

ここからPVランキングを取得するスクリプトの作成していきます。今回はDockerを使用しますので、新たに`compose.create-ranking.yml`を作成します。

```yml {lineNos="inline", name="compose.create-ranking.yml"}
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
```

実際にPVデータを取得する`analytics-api.js`と、表示用にjsonファイルを作成する`create-ranking.js`を`scripts`フォルダ内に配置します。

```js {lineNos="inline", name="scripts/analytics-api.js"}
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
```

```js {lineNos="inline", name="scripts/create-ranking.js"}
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
```

PVデータの取得は以下のコマンドで実行できます。

```powershell {lineNos="inline", name="ターミナル"}
$ docker compose -f compose.create-ranking.yml run --rm node # PVランキング取得
```

## Hugoでランキングを表示

Hugo上では以下の様にしてPVデータを取得できます。参考として、当サイトのメニューバーに表示させているpartialファイルを紹介します。

```html {lineNos="inline", name="ranking.html"}
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
```

## Github Actionsの設定

1週間に一度、自動でランキング取得処理とリポジトリへのプッシュを行えるよう、`.github/workflows`ディレクトリに`update-ranking.yml`を配置します。ついでに手動実行もできるようにしていおきます。

```yml {lineNos="inline", name="update-ranking.yml"}
name: update-ranking

on:
  schedule:
    - cron: '0 0 * * 0'
  workflow_dispatch:

jobs:
  update-ranking:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      id-token: write
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0 # enableGitInfoでの取得用
      - name: Setup npm
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Cache npm dependencies    
        uses: actions/cache@v4
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
```

フローとしては、`update-ranking.yml`で`mainブランチ`に最新のランキングデータがプッシュされ、プッシュとトリガーとして、上の記事で設定した自動デプロイのフローが実行されるといった流れになります。以下の記事も参考にしてください。

{{< box "関連記事" >}}
* [](hugo-github)
{{< /box >}}

続いて、GitHubのSecrets設定で、`GOOGLE_ANALYTICS_CREDENTIALS`に先ほどダウンロードした鍵の内容を設定します。

![GitHub ActionsのSecrets設定](/images/hugo-github-02.png)

また、自動デプロイ処理中でコミットとプッシュができるように、Actionsの設定の「Workflow permissions」を「Read and write permissions」に設定しておきましょう。

![GitHub Actionsの書き込み設定](/images/hugo-ranking-12.png)

これで、GitHubへのプッシュ時にランキングを取得してからデプロイするようになります。

* * *

今回はHugoでPVランキングを取得する方法を紹介しました。やはり、人気記事の一覧はブログサイトとしてはあった方が見栄えが良い気がしますね。以上で記事を終わりにします。

## 参考文献

* [アナリティクス Reporting API v4を使ってGoogle Analyticsのデータを取得する | DevelopersIO](https://dev.classmethod.jp/articles/ga-api-v4/)

* [Hugoで一週間のPV数順の人気記事を作る方法 | Hugoブログテーマ「Salt」](https://hugo-theme-salt.okdyy75.com/article/hugo/ranking/)