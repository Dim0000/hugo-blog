---
title: 【kintone API】レコードの値の取得・変更時の注意点
description: 今回はkintone APIで、kintone.app.record.get()とkintone.app.record.set()を使用する時の注意点について書いていきます。
date: 2025-04-12
categories: 
  - 技術記事
tags: 
  - JavaScript
  - kintone API
archives:
    - 2025/04
thumbnail: /images/kintone.webp
---

今回は**kintone API**で、`kintone.app.record.get()`と`kintone.app.record.set()`を使用する時の注意点について書いていきます。

<!--more-->

## レコードの値の取得・変更

kintone APIには、レコードの値を取得する`kintone.app.record.get()`と、レコードの値を変更する`kintone.app.record.set()`があります。

主に、イベント外でレコード情報を取得・変更したいときに使用する関数になります。

## 関数を使う時の注意点

関数を使う時の注意点として、これらの関数は、`kintone.events.on`のイベントハンドラ内では実行することができません。イベントハンドラ内では、ハンドラに渡される引数のイベントオブジェクトを使用する必要があります。

以下の様に書いた場合、正常に動作しません。

{{< code lang="javascript" title="" >}}
kintone.events.on('app.record.create.show', function(event) {
    const record = kintone.app.record.get(); // 使えない
    // ...
});
{{< /code >}}

`kintone.events.on`のイベントハンドラ内では、以下の様に引数のeventオブジェクトでレコード情報を取得し、オブジェクトをreturnすることで更新ができます。

{{< code lang="javascript" title="" >}}
kintone.events.on('app.record.create.show', function(event) {
    const record = event.record;
    // ...
    return event;
});
{{< /code >}}

関数の使いどころとしては、以下のように、ボタンを押下した時の処理に使用することができます。

{{< code lang="javascript" title="" >}}
// ボタンを押したときにレコード情報を取得
document.getElementById('my-button').addEventListener('click', function() {
    const record = kintone.app.record.get();
    // ...
});
{{< /code >}}

* * *

今回はkintone APIの`kintone.app.record.get()`と`kintone.app.record.set()`についてまとめました。以上で記事を終わりにします。

## 参考文献

* [レコードの値を取得する | cybozu developer network](https://cybozu.dev/ja/kintone/docs/js-api/record/get-record/)

* [レコードに値をセットする | cybozu developer network](https://cybozu.dev/ja/kintone/docs/js-api/record/set-record-value/)