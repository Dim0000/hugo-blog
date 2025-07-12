---
title: 【Googleカレンダー】月末日の繰り返しタスクを追加する
description: 今回はGoogleカレンダーで月末の繰り返しのタスクをGoogle ToDoリストを活用して追加する方法について紹介したいと思います。
date: 2024-04-13
categories: 
  - 技術記事
tags: 
archives:
    - 2024/04
thumbnail: /images/app.webp
---

今回は**Googleカレンダー**で月末の繰り返しのタスクをGoogle ToDoリストを活用して追加する方法について紹介したいと思います。

<!--more-->

## 月末のタスクを設定する方法

Googleカレンダーの予定の繰り返し設定では、毎週・毎月等の設定が可能で便利ですが、何故か月末日の繰り返しができない仕様となっています。Googleカレンダーで予定を「31日」に設定すると、31日が存在しない月はイベントを表示してくれません。

{{< luminous src="/images/googlecalendar-end-of-month-01.png" caption="Googleカレンダーの予定の繰り返し設定">}}

毎月の月末に予定を入れたい人にとっては、地味に面倒な問題ですね。ネットでは、この問題に対しては`icsファイル`を変更して対応するというやり方がよく紹介されています。

今回は異なるアプローチとして、Google ToDoリストからタスクを設定してみます。正確には予定ではなくタスクを設定しているので、カレンダーの予定とは若干異なるものではありますが、リマインダーとしては使えるかと思います。

Google ToDoリストとはタスクの作成・管理アプリで、Googleカレンダーと連携が可能です。マイカレンダーで「ToDoリスト」のチェックボックスをオンにする必要があります。

手順としては簡単で、「[Google ToDoリスト](https://calendar.google.com/calendar/u/0/r/tasks)」からタスクを作成し、以下の通りに設定すればOKです。

* 繰り返し設定：「カスタム」
* 繰り返す間隔：「1か月ごと」「末日」

{{< luminous src="/images/googlecalendar-end-of-month-02.png" caption="月末にタスク設定1">}}

{{< luminous src="/images/googlecalendar-end-of-month-03.png" caption="月末にタスク設定2">}}

Googleカレンダーを確認すると、毎月の月末にタスクが設定されていることが分かります。

{{< luminous src="/images/googlecalendar-end-of-month-04.png" caption="月末にタスク設定3">}}

{{< luminous src="/images/googlecalendar-end-of-month-05.png" caption="月末にタスク設定4">}}

ポイントとしましては、Googleカレンダーから直接タスクを追加するやり方だと末日を設定することができなかったので、Google ToDoリストのアプリからタスクを追加する必要がありそうです。

* * *

今回はGoogleカレンダーで月末の繰り返しのタスクを設定する方法について紹介しました。

参考になれば幸いです。以上で記事を終わりにします。

## 参考文献

* [Google ToDo リストと Google カレンダーで繰り返すタスクを管理する | Google カレンダー ヘルプ](https://support.google.com/calendar/answer/12132599?hl=ja&co=GENIE.Platform%3DAndroid)