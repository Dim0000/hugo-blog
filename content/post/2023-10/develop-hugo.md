---
title: 【Hugo】ローカルにブログを構築する【Docker対応】
description: 今回はローカルにHugoでブログサイトを構築し、WordPressから記事を移行するまでの流れを書いていきます。
date: 2023-10-10
categories: 
  - ブログ運営
tags: 
  - Hugo
  - WordPress
  - Docker
archives: 
  - 2023/10
thumbnail: /images/hugo.png
---

今回はローカルに**Hugo**でブログサイトを構築し、WordPressから記事を移行するまでを書いていきます。環境はWindows10になります。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/wordpress-to-hugo" >}}</li>
</ul>
{{< /box >}}

## Hugoのインストール

公式のGitHubのリリースページからZIPファイルをダウンロードします。筆者はWindowsの`windows-amd64版`をダウンロードしました。

* [Releases · gohugoio/hugo | GitHub](https://github.com/gohugoio/hugo/releases)

Hugoのフォルダは`C:\Hugo\bin`とします。ZIPファイルを解凍し、`hugo.exe`をbinフォルダに配置します。

続いて、環境変数のパスを通します。Windowsの設定から、「システム」→左側一番下の「詳細情報」→右側の「システムの詳細設定」→一番下の「環境変数」を開きます。そこから、「ユーザーの環境変数」→「Path」を編集し、`C:\Hugo\bin`を設定します。

コマンドプロンプトで`hugo help`を実行し、ヘルプ一覧が表示されたらインストール完了です。

なお、Hugoのバージョンアップデートについては、`hugo.exe`を新しい物へ差し替えればOKです。

### ローカルに初期サイトを構築

`C:\Hugo`内にブログ用のフォルダを作成して初期サイトを構築します。サイトはGitHubで管理するので、Gitリポジトリの初期化もしておきます。

{{< code lang="powershell" title="ターミナル" >}}
$ cd C:\Hugo\
$ hugo new site dimzakki.com
$ cd C:\Hugo\dimzakki.com
$ git init
{{< /code >}}

サイト名は`dimzakki.com`としていますが、自分の好きな名前に変えて下さい。

続いてテーマを導入します。Hugoには豊富なテーマプラグインがあります。当サイトでは、シンプルかつ今までのブログに近かった**Mainroad**を採用しました。

* [Mainroad | GitHub](https://github.com/vimux/mainroad)

今回はgitのサブモジュールとしてインストールします。

{{< code lang="powershell" title="ターミナル" >}}
$ git submodule add https://github.com/vimux/mainroad themes/mainroad
{{< /code >}}

`hugo.toml`の設定ファイルの記述を追加してMainroadテーマを有効にします。

{{< code lang="toml" title="hugo.toml" >}}
theme = "mainroad"
{{< /code >}}

ローカルでサイトを確認したい場合は`serverコマンド`を実行し、`http://localhost:1313/`でサイトプレビューを確認できます。

{{< code lang="powershell" title="ターミナル" >}}
$ hugo server -D # draft:trueの下書き記事も表示する
{{< /code >}}

Hugoでの記事の作成方法などはここでは割愛します。

## Dockerでサイトをビルドする場合

上にある手順以外では、Dockerを使うことで`hugo.exe`を配置しなくてもHugoを動かせます。Dockerイメージは**hugo-extended-docker**を使います。（Dockerの環境構築については割愛します）

* [peaceiris/hugo-extended-docker | GitHub](https://github.com/peaceiris/hugo-extended-docker)

ブログ用フォルダ内で`docker-compose.yml`に以下を記述し実行することで、Hugoコマンドを実行することができます。

{{< code lang="yml" title="docker-compose.yml" >}}
version: '3'

services:
  hugo:
    container_name: hugo
    image: peaceiris/hugo:latest
    ports:
      - 1313:1313
    volumes:
      - .:/src
    command:
      - server
      - --bind=0.0.0.0
      - --buildDrafts
{{< /code >}}

{{< code lang="powershell" title="ターミナル" >}}
$ docker-compose run --rm hugo version # version確認

$ docker-compose up hugo # hugo serverを実行
{{< /code >}}

上と同様に、`http://localhost:1313/`を開くことでサイトプレビューを確認できます。

## Hugoの設定

Hugoの設定は`hugo.toml`（古いバージョンだと`config.toml`）で設定します。参考までに、当サイトでは以下の様な感じにしてます。

{{< code lang="toml" title="hugo.toml" >}}
baseURL = "https://xxxxxxxxx/" # サイトURL
title = "xxxxx" # サイトタイトル
DefaultContentLanguage = "ja"
languageCode = "ja-JP"
theme = "mainroad"
hasCJKLanguage = true
summarylength = 120
googleAnalytics = "G-XXXXXXXXXX" # アナリティクスのトラッキングID
enableGitInfo = "true" # 最終更新日をgitから取得

[permalinks]
  post = "/:filename/"

[Params]
  Subtitle = "xxxxx" # サブタイトル
  description = "xxxxx" # meta description
  post_meta = ["date", "categories"]
  highlightColor = "#0095d9"
  mathjax = true
  dateformat = "2006-01-02"
  customCSS = ["/css/custom.css"]
  toc = true
[Params.sidebar]
  home = "right"
  list = "right"
  single = "right"
  widgets = ["categories", "taglist", "recent", "archives", "social", "search"]
[Params.widgets]
  recent_num = 5
  categories_counter = true
  tags_counter = true
  
[taxonomies]
  tag = "tags"
  category = "categories"
  archive = "archives"

[related]
  includeNewer = true
[[related.indices]]
  name = "tags"
  weight = 80
[[related.indices]]
  name = "categories"
  weight = 60

[[Menus.main]]
  Name = "このサイトについて"
  URL = "/about"
  weight = 10
[[Menus.main]]
  Name = "プロフィール"
  URL = "/profile"
  weight = 20
[[Menus.main]]
  Name = "お問い合わせ"
  URL = "/contact"
  weight = 50
[[Menus.footer]]
  Name = "プライバシーポリシー"
  URL = "/privacy-policy"
{{< /code >}}

## 記事のデータの移行

記事のデータ移行には**wordpress-to-hugo-exporter**というWordPressプラグインがあるので、それが使えれば簡単に移行ができると思います。

* [wordpress-to-hugo-exporter | GitHub](https://github.com/SchumacherFM/wordpress-to-hugo-exporter)

GitHubの「Download ZIP」からダウンロードし、ZIPファイルをWordpressのプラグインページからアップロードすることで、WordPressのツールからエクスポートが可能になります。

筆者の場合は「Export to Hugo」ZIPファイルが何故かエラーでダウンロード出来なかったので、手動でコピペして記事を移しました…。

移行作業としては記事内容のコピペが主で、それをマークダウン形式に書き換える作業が殆どでした。

* * *

今回は、ローカルでブログを構築する所まで紹介しました。以上で記事を終わりにします。

## 参考文献

* [Hugoの設定 | Go ＆ Hugo ドキュメント](https://juggernautjp.info/getting-started/configuration/)

* [WordPressの記事をHugoに移行する | Qiita](https://qiita.com/Tebasaki314/items/ec50bbbcc4a76a95c5cf)