---
title: 【kintone API】アクションボタンを非表示にする方法
description: 今回はkintone APIで、アクションボタンを非表示にするカスタマイズについて紹介します。
date: 2025-07-05
categories: 
  - 技術記事
tags: 
  - JavaScript
  - kintone API
archives:
    - 2025/07
thumbnail: /images/kintone.webp
---

今回は**kintone API**で、アクションボタンを非表示にするカスタマイズについて紹介します。

<!--more-->

## アクションボタンの要素取得

レコード詳細画面の表示時に、ステータスバーのアクションボタンを非表示します。今回はボタン名が「アクション」のものを非表示とします。

まず、レコード詳細画面の表示時のイベントで、ステータスアクションのDOMを`getElementsByClassName('gaia-app-statusbar-action-label')`で取得します。ここで、注意点としては、`'app.record.detail.show'`のイベント直後だと、ステータスアクションのDOMが取得できません。

そこで、`setTimeout`で遅延させることでDOMを取得できるようにします。また、レコードのプロセス管理を行っている場合は、ステータスを変更されるDOMも一緒に取得されるので、その場合はボタンの表示名で条件に追加する必要があります。

サンプルとして、下記のコードでボタンを非表示にできます。

{{< code lang="javascript" title="" >}}
(function () {
  "use strict";

  kintone.events.on('app.record.detail.show', function (event) {
    setTimeout(function () {
      const statusBarActions = document.getElementsByClassName('gaia-app-statusbar-action-label');

      for (let i = 0; i < statusBarActions.length; i++) {
        const actionLabel = statusBarActions[i];
        if (actionLabel.title === "アクション") {
          actionLabel.parentNode.style.display = 'none';
        }
      }
    }, 100);

    return event;
  });
})();
{{< /code >}}
適宜、レコードの条件などを追加することで、より実践的な活性制御が実現できます。

* * *

今回はkintone APIでのアクションボタンの制御についてまとめました。以上で記事を終わりにします。

## 参考文献

* [アクションボタン表示・非表示切り替え - kintone カスタマイズ | cybozu developer community](https://community.cybozu.dev/t/topic/490)

* [Window: setTimeout() メソッド - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/setTimeout)