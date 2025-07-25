---
title: 【AWS】HugoをS3・CloudFrontにデプロイする【サイト構築②】
description: ローカルで構築したHugoのブログサイトをAWS S3にデプロイし、Amazon CloudFrontで配信するまでの流れをまとめていきます。
date: 2023-10-15
categories: 
  - 技術記事
tags: 
  - ブログ運営
  - Hugo
  - AWS
archives: 
  - 2023/10
thumbnail: /images/aws.webp
---

ローカルで構築した**Hugo**のブログサイトを**AWS S3**にデプロイし、**Amazon CloudFront**で配信するまでの流れをまとめていきます。

<!--more-->

なお、ローカルでのHugoサイトの作成と、Route 53での独自ドメイン取得が出来ている前提で話を進めていきます。

{{< box "関連記事" >}}
* [](wordpress-to-hugo)
* [](domain-to-route53)
* [](develop-hugo)
* [](hugo-github)
{{< /box >}}

## HugoをS3にデプロイする

まずは**S3**のバケットを作成していきます。

![バケットの作成1](/images/hugo-deploy-01.png)

サイトは独自ドメインで運用するので、最終的にはS3のパブリックアクセスはブロックしてホスティングします。その前にS3でホスティングしてサイトを確認したいので、一旦パブリックアクセスをすべてブロック」のチェックは外します。

![バケットの作成2](/images/hugo-deploy-02.png)

その他の設定はいじらなくて良いので、そのままバケットを作成します。

続いて、ビルドしたファイルのアップロードを行っていきます。

![バケットの作成3](/images/hugo-deploy-03.png)

Hugoのビルド時に生成されたファイルが`publicフォルダ`内にあるので、それらを選択します。下にある「アップロード」をクリックすると選択されたファイルがバケットにアップロードされます。

![バケットの作成4](/images/hugo-deploy-04.png)

続いて、プロパティからS3の「静的ウェブサイトホスティング」を有効にしていきます。

![静的ウェブサイトホスティングの設定1](/images/hugo-deploy-05.png)

![静的ウェブサイトホスティングの設定2](/images/hugo-deploy-06.png)

インデックスドキュメントには`index.html`を入力します。

![静的ウェブサイトホスティングの設定3](/images/hugo-deploy-07.png)

次に、「アクセス許可」からバケットポリシーを設定します。ポリシーに以下を記述します。

```json {lineNos="inline", name="バケットポリシー"}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::バケット名/*"
            ]
        }
    ]
}
```

ここまでで、静的ウェブサイトホスティングが完了するので、「プロパティ」で発行されたURLからアクセスし、サイトが表示されるかを確認しましょう。

![静的ウェブサイトホスティングの設定4](/images/hugo-deploy-09.png)

## ACMでSSL証明書を発行する

S3へのデプロイが完了したので、S3へCloudFrontからでアクセスするように設定します。その前に**ACM**でSSL証明書を発行していきます。CloudFrontにACMのSSL証明書を適用するにはリージョンを「米国東部 (バージニア北部)　us-east-1」にする必要があります。[^1]

[^1]:[CloudFront で SSL/TLS 証明書を使用するための要件 | Amazon CloudFront](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html#https-requirements-aws-region)

![SSL証明書の発行1](/images/hugo-deploy-10.png)

「パブリック証明書をリクエスト」を選択します。

![SSL証明書の発行2](/images/hugo-deploy-11.png)

ドメイン名に`取得ドメイン`を入力します。当サイトの場合、併せて`*.取得ドメイン`も追加しています。

![SSL証明書の発行3](/images/hugo-deploy-12.png)

ここまでで証明書の発行手続きが完了するので、ドメインにCNAMEレコードを追加します。「Route53でのレコード作成」から作成を行います。

![SSL証明書の発行4](/images/hugo-deploy-13.png)

![SSL証明書の発行5](/images/hugo-deploy-14.png)

![SSL証明書の発行6](/images/hugo-deploy-15.png)

証明書の「状況」ステータスが「発行済み」になれば成功です。

![SSL証明書の発行7](/images/hugo-deploy-16.png)

## CloudFrontからサイトにアクセスする

証明書の発行まで完了したので、S3へ**CloudFront**からでアクセスするように設定します。まずディストリビューションの作成から行っていきます。「オリジンドメイン」とOACの「名前」はS3のバケット名を入力します。

![ディストリビューションの作成1](/images/hugo-deploy-17.png)

![ディストリビューションの作成2](/images/hugo-deploy-18.png)

「カスタムSSL証明書」には先ほど作成した証明書を、「デフォルトルートオブジェクト」には`index.html`を入力し、ディストリビューションを作成します。

![ディストリビューションの作成3](/images/hugo-deploy-19.png)

![ディストリビューションの作成4](/images/hugo-deploy-20.png)

続いて、S3バケットのアクセス許可設定を変更します。作成したディストリビューションの「編集」をクリックし、ポリシーをコピーしてバケットポリシーを変更します。

![ディストリビューションの作成5](/images/hugo-deploy-21.png)

![ディストリビューションの作成6](/images/hugo-deploy-22.png)

バケットポリシーにはコピーしたものをそのまま差し替えればOKです。

![ディストリビューションの作成7](/images/hugo-deploy-23.png)

ここまでで一旦ディストリビューションの設定は終わりです。しかし、このままだとルートオブジェクト以外へのリクエストに`index.html`が付かないので、ルートオブジェクト以外にアクセスができない状態になってます。その為、CloudFrontの関数でリクエストを書き換える処理を設定します。

![関数の作成1](/images/hugo-deploy-24.png)

![関数の作成2](/images/hugo-deploy-25.png)

関数名を適当に設定し、以下のコードを貼り付けます。「発行」タブから「関数の発行」をクリックします。

```js {lineNos="inline", name="関数"}
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    return request;
}
```

![関数の作成3](/images/hugo-deploy-26.png)

![関数の作成4](/images/hugo-deploy-27.png)

![関数の作成5](/images/hugo-deploy-28.png)

関数は作成しましたので、ディストリビューションの「ビヘイビア」から作成した関数を関連付けします。

![関数の作成6](/images/hugo-deploy-29.png)

最後に、ドメインのAレコードをCloudFrontに変更します。

![関数の作成7](/images/hugo-deploy-30.png)

これでCloudFrontでの配信の設定は終わりです。取得したドメインにアクセスし、サイトが表示されたら成功です。

ついでに、最初の方でパブリックアクセスのブロック設定をOFFにしていたので戻しておきましょう。

* * *

今回はHugoサイトをAWSにデプロイ・配信するまでをまとめました。以上で記事を終わりにします。


## 参考文献

* [チュートリアル: Amazon S3 での静的ウェブサイトの設定 | Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html#step4-add-bucket-policy-make-content-public)

* [AWSでSSL証明書を発行する手順 | 株式会社カサレアル BSブログ](https://bsblog.casareal.co.jp/archives/4024)

* [index.html を追加してファイル名を含まない URL をリクエストする | Amazon CloudFront](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html)