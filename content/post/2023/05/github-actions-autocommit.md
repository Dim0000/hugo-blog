---
title: 【GitHub Actions】定期的に自動commit・pushを行う
description: GitHub Actionsを使い、自動でcommitとpushを行うように設定してみます。
date: 2023-05-20
categories: 
  - 技術記事
tags: 
  - GitHub
archives: 
  - 2023/05
thumbnail: /images/github.webp
---

**GitHub Actions**を使い、自動でcommitとpushを行うように設定してみます。

<!--more-->

## やりたいこと

GitHubのリポジトリ内のテキストファイルを、GitHub Actionsのワークフローを用いて毎日自動で更新し、同時にcommitとpushを行います。

テキストファイルとコミットログには、Actionを実行した時間を取得して書き込む様にします。

## 必要なファイル

必要なファイルは以下の2つになります。

```plaintext {lineNos="inline", name="リポジトリ構成"}
<リポジトリ>
 ├ commit_log.txt
 └ .github
  └ workflows
   └ auto-commit.yml
```

GitHubのリポジトリ直下にコミットログを追加するための`commit_log.txt`と、自動コミット・プッシュのワークフローの設定ファイルである`auto-commit.yml`を`/.github/workflows`直下に配置します。

ymlファイルはリポジトリの「Actionsタブ「の「set up a workflow yourself」からでも作成することができます。

![Actionsの設定ページ](/images/github-actions-autocommit-01.png)

`auto-commit.yml`の内容は以下になります。

```yml {lineNos="inline", name="auto-commit.yml"}
name: auto-commit

on:
  workflow_dispatch:

  schedule:
    - cron:  "0 0 * * *"

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set current datetime as env variable
        env:
          TZ: 'Asia/Tokyo' 
        run: echo "CURRENT_DATETIME=$(date +'%Y-%m-%d %H:%M:%S')" >> $GITHUB_ENV

      - name: Commit
        run: |
          git config --global user.email ${{ secrets.USER_EMAIL }}
          git config --global user.name ${{ secrets.USER_NAME }}
          echo -e ${{ env.CURRENT_DATETIME }} >> commit_log.txt
          git add commit_log.txt
          git commit -m "[add] 自動コミット:${{ env.CURRENT_DATETIME }}"
          git push origin main
```

ワークフローの手動実行と毎日の自動実行を設定しています。

## レポジトリの設定

続いて、環境変数の`USER_EMAIL`と`USER_NAME`を設定します。

リポジトリの「Settingsタブ」→「Secrets and variables」→「Actions」→「New repository secret」から環境変数を設定します。

環境変数はそれぞれ、`USER_EMAIL`は登録しているメールアドレス、`USER_NAME`はGitHubのIDになります。設定すると以下の様な画面になります。

![レポジトリの設定ページ1](/images/github-actions-autocommit-02.png)

また、設定の「Actions」→「General」で「Workflow permissions」の設定が「Read and write permissions」になっているか確認しましょう。これが設定されていないとActionの書き込み権限が無いので上手く動作しません。

![レポジトリの設定ページ2](/images/github-actions-autocommit-03.png)

## Actionの実行

ここまでで準備が終わったので、Actionを実行します。

![Actionの実行ページ](/images/github-actions-autocommit-04.png)

これで、自動で設定したActionが実行されるようになりました。画像から設定したActionが毎日実行されていることが分かります。

![Actionの実行履歴](/images/github-actions-autocommit-05.png)

* * *

今回はGitHub Actionsのワークフローに関する記事でした。特に有用な使い道は無さそうな内容ですが、参考になれば幸いです。以上で記事を終わりにします。

## 参考文献

* [GitHub Actionsのドキュメント | GitHub Docs](https://docs.github.com/ja/actions)

* [Permission denied to github-actions[bot] | Stack Overflow](https://stackoverflow.com/questions/72851548/permission-denied-to-github-actionsbot)