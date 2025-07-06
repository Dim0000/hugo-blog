---
title: 【Hugo】Github ActionsでS3に自動でデプロイする【サイト構築③】
description: 今回はHugoをGithubにプッシュした際に、自動でS3にデプロイする方法を紹介します。
date: 2023-11-24
categories: 
  - 技術記事
tags: 
  - ブログ運営
  - Hugo
  - AWS
  - GitHub
archives: 
  - 2023/11
thumbnail: /images/hugo.webp
---

今回は**Hugo**を**Github**にプッシュした際に、自動でS3にデプロイする方法を紹介します。

<!--more-->

必要な手順としては、AWS IAMロールの設定およびGithub Actionsの設定のみになります。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/wordpress-to-hugo" >}}</li>
<li>{{< ref "/domain-to-route53" >}}</li>
<li>{{< ref "/develop-hugo" >}}</li>
<li>{{< ref "/hugo-deploy" >}}</li>
</ul>
{{< /box >}}

## IAMロールの設定

まずは、AWS IAMコンソールの「IDプロバイダ」から、OIDCプロバイダの設定を以下の様に行います。

OIDCプロバイダとは、AWSに信頼できる外部の認証元として登録するサービスのことです。AWSとGitHub Actionsを連携させるために設定するために必要になります。

IDプロバイダーの追加画面で、以下の通りに設定します。 

* プロバイダのタイプ：`OpenID Connect`
* プロバイダのURL：`https://token.actions.githubusercontent.com`
* 対象者：`sts.amazonaws.com`

{{< luminous src="/images/hugo-github-01.png" caption="OIDCプロバイダの設定">}}

続いてIAMロールを作成します。ロール名は分かれば何でも良いですが、今回は`blog_github_action_role`とします。

作成したロールの信頼ポリシーの編集で、ポリシーを以下の通りに設定します。それぞれ、AWSアカウントIDとGitHubユーザー名・リポジトリ名を指定します。

{{< code lang="json" title="信頼ポリシー" hl_lines="7 12" >}}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWSアカウントID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<GitHubユーザー名>/<GitHubリポジトリ名>:*"
        }
      }
    }
  ]
}
{{< /code >}}

ここまででAWS側の設定は完了です。

## Github Actionsの設定

続いて、ワークフローを定義するファイルの作成と、Github Actionsの設定になります。

GitHubリポジトリの`.github/workflows`ディレクトリに`build-deploy.yml`を配置します。ファイルは以下の様にします。

{{< code lang="yml" title="build-deploy.yml" hl_lines="29 36" >}}
name: build-deploy

on:
  push:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Get Latest Hugo Version
        id: hugo_version
        run: |
          latest=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest | jq -r '.tag_name')
          echo "version=${latest#v}" >> $GITHUB_OUTPUT
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${{ steps.hugo_version.outputs.version }}/hugo_extended_${{ steps.hugo_version.outputs.version }}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0 # enableGitInfoでの取得用 
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

ここで、36行目に今回作成したIAMのロール名を指定します。

ワークフローの内容としては、`main`ブランチにプッシュされた時に、HugoのビルドとAWS S3へのデプロイを行います。Hugoは最新バージョンを取得しビルドするようにしています。

また、36行目で`fetch-depth: 0`としているのは、記事の最終更新日を設定する際に、過去のコミットの日時も取得するためです。

次に、GitHubのリポジトリ設定で、「Secrets and variables（Actions）」の設定画面で、`Repository secrets`に変数を以下の通りに設定します。 

`AWS_ACCOUNT_ID`にAWSのアカウントID、`S3_BUCKET`にS3バケット名、`DISTRIBUTION_ID`にはディストリビューションIDを設定します。

* `AWS_ACCOUNT_ID`：AWSのアカウントID
* `S3_BUCKET`：AWS S3のバケット名
* `DISTRIBUTION_ID`：Amazon CloudFrontのディストリビューションID

{{< luminous src="/images/hugo-github-02.png" caption="GitHubのSecrets設定">}}

ここまでで、必要な設定は完了になります。これでプッシュ時に自動でS3にデプロイできるようになりました。

実際にGitHubにプッシュし、GitHub Actionsの画面から処理が実行されること、処理実行後にサイトに更新が反映されていることが確認できたら成功です。

* * *

ここまででHugoブログの構築が完了となります。以上で記事を終わりにします。

## 参考文献

* [Host on GitHub Pages | Hugo.io](https://gohugo.io/host-and-deploy/host-on-github-pages/)

* [GitHub ActionsにAWSクレデンシャルを直接設定したくないのでIAMロールを利用したい | DevelopersIO](https://dev.classmethod.jp/articles/github-actions-aws-sts-credentials-iamrole/)