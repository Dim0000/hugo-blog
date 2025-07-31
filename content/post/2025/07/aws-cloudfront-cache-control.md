---
title: 【AWS】CloudFrontでCache-Controlを設定する
description: Amazon CloudFrontでキャッシュ制御ヘッダ（Cache-Control）を明示的に設定する方法を紹介します。
date: 2025-07-31
categories: 
  - 技術記事
tags: 
    - AWS
archives:
    - 2025/07
thumbnail: /images/aws.webp
---

**Amazon CloudFront**でキャッシュ制御ヘッダ（Cache-Control）を明示的に設定する方法を紹介します。

<!--more-->

## Cache-Controlヘッダーについて

PageSpeed Insightsでサイトを計測する時に「効率的なキャッシュ保存期間を使用する」という警告が出ることあります。これは、Webサイトの静的リソース（CSSや画像など）に適切な 「Cache-Controlヘッダー」が設定されておらず、再訪問時に毎回読み込み直すため、パフォーマンスが低下するという内容です。

CloudFrontで配信している場合、Cache-Controlヘッダーを設定することで警告を改善できます。Cache-Controlヘッダーとは、Webブラウザなどに対して「このファイルはどれくらいの期間キャッシュしていいか」を伝えるHTTPヘッダーになります。

## CloudFrontでCache-Controlを設定する

今回は、1年間キャッシュ有効の設定を適用します。

CloudFrontの「ディストリビューション」で「ビヘイビア」を選択します。「編集」を押下し、「レスポンスヘッダーポリシー」の「Create response headers policy」を押下します。

レスポンスヘッダーポリシーの作成画面で、「カスタムヘッダー - オプション」の追加ボタンを押下し、以下の通りに設定します。名前は任意のものでOKです。

* ヘッダー：`Cache-Control`
* 値：`public, max-age=31536000, immutable`

作成ボタンを押下し、「レスポンスヘッダーポリシー」に先ほど作成したポリシーを指定し保存します。ここまでで設定はOKです。

* * *

今回はCloudFrontでCache-Controlを明示的に設定する方法を紹介しました。以上で記事を終わりにします。

## 参考文献

* [レスポンスヘッダーポリシーを理解する | Amazon CloudFront](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/understanding-response-headers-policies.html)