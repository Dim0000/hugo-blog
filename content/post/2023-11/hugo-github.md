---
title: 【Hugo】Github ActionsでS3に自動でデプロイする
description: 今回はHugoをGithubにプッシュした際に自動でS3にデプロイする
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
thumbnail: /images/hugo.png
---

今回は**Hugo**を**Github**にプッシュした際に自動でS3にデプロイする方法を紹介します。必要な手順としては、IAMロールの設定と、Github Actionsの設定のみになります。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/wordpress-to-hugo" >}}</li>
</ul>
{{< /box >}}

## IAMロールの設定

まずは、IAMコンソールのIDプロバイダから、OIDCプロバイダの設定を以下の様に行います。プロバイダのタイプは`OpenID Connect`で、プロバイダのURLは`https://token.actions.githubusercontent.com`、対象者は`sts.amazonaws.com`を入力します。

{{< luminous src="/images/hugo-github-01.png" caption="OIDCプロバイダの設定1">}}

続いてIAMロールを作成します。ポリシー名は適当に設定し、ポリシーの内容は以下の様に設定します。

{{< code lang="json" title="ポリシー" >}}
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


{{< luminous src="/images/hugo-github-02.png" caption="OIDCプロバイダの設定2">}}

{{< luminous src="/images/hugo-github-03.png" caption="OIDCプロバイダの設定3">}}

## Github Actionsの設定

続いて、Github Actionsの設定です。GitHubリポジトリに以下の様に`s3_upload.yml`を配置します。`distribution-id`には自分の環境でのディストリビューションIDを設定する必要があります。

{{< code lang="yml" title="s3_upload.yml" >}}
name: s3_upload

on:
  push:
    branches:
      - main

jobs:
  build: # Hugoビルド
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "latest"
          extended: true     
      - name: Build Hugo
        run: hugo --minify --buildFuture
      - name: upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: my-artifact
          path: public
  deploy: # S3にデプロイ
    needs: build
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - name: Download artifacts for build
        uses: actions/download-artifact@v3
        with:
          name: my-artifact
          path: public
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@master
        with:
          aws-region: ap-northeast-1
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/blog_github_action_role
          role-session-name: GitHubActions-${{ github.run_id }}
          role-duration-seconds: 900
      - name: Upload files to the production website with the AWS CLI
        run: |
          echo "uploding to s3 ..."
          aws s3 sync public s3://${{ secrets.S3_BUCKET }}/ --size-only --delete
          aws cloudfront create-invalidation --region ap-northeast-1 --distribution-id XXXXXXXXXXXXX --paths "/*"        
  delete-artifacts: # artifacts削除
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: kolpav/purge-artifacts-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          expire-in: 0
{{< /code >}}

また、GitHubのSecrets設定で、`AWS_ACCOUNT_ID`にAWSのアカウントIDと`S3_BUCKET`にバケット名を入れます。

{{< luminous src="/images/hugo-github-04.png" caption="GitHubのSecrets設定">}}

これで設定は完了ですので、実際にGitHubにプッシュし、All workflowsの画面から処理が実行されているのを確認できたら成功です。

{{< luminous src="/images/hugo-github-04.png" caption="GitHubのSecrets設定">}}

* * *

これでプッシュ時に自動でS3にデプロイできるようになりました。以上で記事を終わりにします。

## 参考文献

* [GitHub ActionsにAWSクレデンシャルを直接設定したくないのでIAMロールを利用したい | DevelopersIO](https://dev.classmethod.jp/articles/github-actions-aws-sts-credentials-iamrole/)

* [静的サイトジェネレータ「Hugo」でブログサイトを S3 + CloudFrontでホストするまで [第4回〜HugoをGithub Action でS3にプッシュする〜] | 犬と暮らすエンジニア日記](https://technowanko.com/posts/hugo/004_hugo_build_on_github/)