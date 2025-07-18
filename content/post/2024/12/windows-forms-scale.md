---
title: 【Visual Studio】Windowsフォームで画面スケールがおかしくなった時の対応
description: Visual Studioでの、Windowsフォームのスケールについての記事になります。
date: 2024-12-27
categories: 
  - 技術記事
tags: 
  - C#
  - VB
  - Windows Forms
archives:
    - 2024/12
thumbnail: /images/c-sharp.webp
---

**Visual Studio**での、**Windowsフォーム**のスケールについての記事になります。

<!--more-->

## Windowsフォームのスケーリング

Visual StudioでWindowsフォームを作成中に、「メインディスプレイのスケールは X% に設定されています。」といったメッセージがVisual Studio上部に表示されることがあります。

原因としては、高DPIのディスプレイでWindowsフォームデザイナーの画面を開くと出てくるようです。

その状態で「100% のスケールで Visual Studio を再起動します」を押下してしまうと、フォームのサイズが変わってしまうので気を付けましょう。自動でソースも書き換えられてしまうので、元に戻したい場合、変更前のソースから元に戻す必要があります。

以前、ソースを元に戻してもWindowsフォームデザイナーの画面が戻らない場合がありましたが、Windowsフォームデザイナーのプロパティの「AutoScaleMode」を「Dpi」にしてビルドすると元に戻りました。

* * *

今回はVisual StudioでのWindowsフォームのスケールついて紹介しました。以上で記事を終わりにします。

## 参考文献

* [メイン ディスプレイのスケーリングは X% に設定されています | Microsoft Learn](https://learn.microsoft.com/ja-jp/visualstudio/designers/scaling-percentage-display-setting-message?view=vs-2022)