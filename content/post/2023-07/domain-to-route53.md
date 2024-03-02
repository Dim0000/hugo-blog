---
title: 【AWS】Route 53に他サービスの独自ドメインを移管する【ブログ移行①】
description: 今回、ムームードメインで取得した独自ドメインをAmazon Route 53へ移管しましたので、移管の流れを備忘録として残します。
date: 2023-07-29
categories: 
  - 技術記事
tags: 
  - ブログ運営
  - AWS
archives: 
  - 2023/07
thumbnail: /images/aws.png
---

今回、ムームードメインで取得した**独自ドメイン**を**Amazon Route 53**へ移管しましたので、移管の流れを備忘録として残します。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/wordpress-to-hugo" >}}</li>
<li>{{< ref "/develop-hugo" >}}</li>
<li>{{< ref "/hugo-deploy" >}}</li>
<li>{{< ref "/hugo-github" >}}</li>
</ul>
{{< /box >}}

## ドメインをRoute 53で管理する利点

**Route 53**はAWSのDNS（ドメインネームシステム）サービスです。ドメインの管理やDNS権威サーバの役割を果たします。

当サイトはムームードメインで取得した独自ドメイン（`dimzakki.com`）を使い、ロリポップのサーバーにWordPressをホストしてます。そのドメインを、Route 53へと移管しました。移管料金は13$（移管してから1年分の管理費）かかりました。

ドメインをRoute 53で管理するメリットとしては、S3・CloudFrontでホスティングする際にSSL対応ができる点が大きいです。その他、DNSサーバー自体が冗長化されており、高いSLA（サービス品質保証）が保証されていることなどが利点になります。

## 作業の流れと必要な物

ドメイン移管の流れとしては、ざっくり分けると以下の2つになります。

{{< box "ドメイン移管の流れ" >}}
<ol>
<li>ネームサーバー設定を移管元サービスからRoute 53へ変更する</li>
<li>ドメインを移管元サービスからRoute 53に移管する</li>
</ol>
{{< /box >}}

ドメインを移管する前にネームサーバー設定をRoute 53へ変更しているのは、これを行わないとドメインの移行時にDNSサービスが使えなくなり、サイトにアクセスできなくなる可能性があるからです。

必要なものは移管元のドメインの管理権限に加え、AWSアカウントと（既にDNSでサービスを管理している場合は）サーバーの公開IPアドレスです。

また、既に独自ドメインでWordPress等のサービスを運営している場合は、作業前にバックアップをとっておきましょう。

### ロリポップのサーバーのIPアドレスの確認

ロリポップの場合、ユーザーページの「ロリポップ！のドメイン」のIPがサーバーのIPアドレスになります。

{{< luminous src="/images/domain-to-route53-01.png" caption="ロリポップのサーバーIPアドレス確認1">}}

IPアドレス自体はロリポップには書いていないので、自分で調べる必要があります。`nslookupコマンド`や『[Google Admin Toolbox dig](https://toolbox.googleapps.com/apps/dig/)』などで調べ控えておきます。

{{< luminous src="/images/domain-to-route53-02.png" caption="ロリポップのサーバーIPアドレス確認2">}}

ここで調べたIPアドレスを後でRoute 53に設定します。

## Route 53でホストゾーンの作成・ネームサーバ設定の変更

ここから移管の作業を始めていきます。今回はムームドメインで取得した独自ドメイン移管を例として解説していきます。

まず、Route 53のダッシュボードからホストゾーンの作成を行っていきます。

{{< luminous src="/images/domain-to-route53-03.png" caption="ホストゾーンの作成1">}}

**ドメイン名**は移管するドメイン名、**タイプ**は**パブリックホストゾーン**を選択します。

{{< luminous src="/images/domain-to-route53-04.png" caption="ホストゾーンの作成2">}}

ホストゾーンを作成すると、**NSレコード**が4つとSOAレコードが作成されます。ここのNSレコードを使って、ムームドメインでDNS設定を変更していきます。

{{< luminous src="/images/domain-to-route53-05.png" caption="ホストゾーンの作成3">}}

ムームドメインにログインし**ネームサーバ設定変更**から設定を変更していきます。今回の場合、変更前はロリポップのネームサーバーに設定されています。

{{< luminous src="/images/domain-to-route53-06.png" caption="ネームサーバ設定変更1">}}

これを先ほどの4つのNSレコードに書き換えます。ここで、末尾の`.`は入力する必要はありません。

{{< luminous src="/images/domain-to-route53-07.png" caption="ネームサーバ設定変更2">}}

{{< luminous src="/images/domain-to-route53-08.png" caption="ネームサーバ設定変更3">}}

これで、ネームサーバー設定はRoute 53になりましたが、ドメイン名とIPアドレスが紐づいていませんので、Aレコードの設定をしていきます。

Route 53のホストゾーンからレコードの作成を行います。

{{< luminous src="/images/domain-to-route53-09.png" caption="レコードの作成1">}}

**レコードタイプ**を**A**、**値**を先ほど控えたIPアドレスを入力します。ここで、必須ではありませんがサブドメインの`www.dimzakki.com`でもアクセスさせたいので、もう1つAレコードを追加作成しています。

{{< luminous src="/images/domain-to-route53-10.png" caption="レコードの作成2">}}

{{< luminous src="/images/domain-to-route53-11.png" caption="レコードの作成3">}}

これで、ネームサーバの設定変更が完了になります。`nslookup`等での疎通確認と、サイトへアクセスできるかも確認しておきましょう。設定が切り替わるまで、少し時間が掛かる可能性もあります。

## ドメインをRoute 53に移管する

次に、ドメイン自体の移管を行います。

まず、準備として、**Whois代行サービス**を設定している場合は設定を解除しておきます。ドメイン移管時に送られる承認メールから承認を行うため、メールが届くようにするためです（ここで設定を解除しても、移管時にまたプライバシー保護の設定ができます）。

また、**認証コード**（AuthCode）もドメイン移管時に必要となるので控えておきます。

{{< luminous src="/images/domain-to-route53-12.png" caption="ドメインの移管1">}}

Route 53の**登録済みドメイン**から移管（イン）の**単一のドメイン**を選択します。

{{< luminous src="/images/domain-to-route53-13.png" caption="ドメインの移管2">}}

移管ドメイン名と、確認のチェックを入力します。移管可否のステータスが「移管可能」になっていることも確認しましょう。

{{< luminous src="/images/domain-to-route53-14.png" caption="ドメインの移管3">}}

DNSサービスは先程設定したネームサーバーを使うので、このままでOKです。

{{< luminous src="/images/domain-to-route53-15.png" caption="ドメインの移管4">}}

ドメインの**認証コード**の入力を求められるので、控えておいた認証コードを入力します。

{{< luminous src="/images/domain-to-route53-16.png" caption="ドメインの移管5">}}

ドメイン登録者（自分）の**連絡先情報**を入力します。管理者も技術者も同じなのでチェックを入れます。**プライバシーの保護**にもチェックを入れます。

{{< luminous src="/images/domain-to-route53-17.png" caption="ドメインの移管6">}}

最終的な確認画面になりますので、確認のチェックを入れてリクエストを送信をクリックします。

{{< luminous src="/images/domain-to-route53-18.png" caption="ドメインの移管7">}}

時間を少し置くと、移管元から確認のメールが来ますので、メール内のリンクから承認を行います。

{{< luminous src="/images/domain-to-route53-19.png" caption="ドメインの移管8">}}

{{< luminous src="/images/domain-to-route53-20.png" caption="ドメインの移管9">}}

ここで、連絡先（メールアドレス）の検証を行っていないと、Route 53から「Verify your email address for ～」というメールが届くので、メール内のリンクをクリックしてメールアドレスの検証を行いましょう（これをしておかないと、ドメインが停止されてしまいますので注意）。

ここまでドメインの移管作業は終わりです。登録済みドメインに、移管したドメインが載っていることを確認しましょう。

{{< luminous src="/images/domain-to-route53-21.png" caption="ドメインの移管10">}}

* * *

ここまで、Route 53へのドメイン移管の解説でした。以上で記事を終わりにします。

## 参考文献

* [Route 53 を使用中のドメインの DNS サービスにする | AWS](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html)

* [ドメイン登録の Amazon Route 53 への移管 | AWS](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/domain-transfer-to-route-53.html)

