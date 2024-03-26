---
title: 【VMware Horizon】外部モニターでポインターがズレる時の解決策
description: VMware Horizon Clientのマルチディスプレイでの使用時に、マウスのポインターの位置がずれる問題についての記事になります。
date: 2024-03-26
categories: 
  - 技術記事
tags: 
archives:
    - 2024/03
thumbnail: /images/app.webp
---

**VMware Horizon Client**のマルチディスプレイでの使用時に、マウスのポインターの位置がズレる問題についての記事になります。

<!--more-->

## 外部モニター接続時にポインターがズレる

最近、仕事で開発環境のVDIにアクセスする際にVMwareを使っていて、クライアントのノートPCを外部モニターに繋いで使用しようと思ったのですが、リモート画面のマウスのポインターがズレて使い物にならない症状が発生しました。クリックした際に、実際にクリックした位置の左上に判定がズレるような感じです。

当初はディスプレイの解像度の問題だろうか？とアプリの設定をいじってみたりしましたが、解決せず。色々試してみた結果、アプリの設定ではなく、exeファイルのプロパティの設定を変えることで解消しました。

実行ファイルである`vmware-view.exe`のプロパティで「互換性」タブをクリック→設定の「**高DPI設定では画面のスケーリングを無効にする**」にチェックを入れればOKです。

* * *

外部モニターが使えないと何かと不便な為、解消できて良かったです。似た症状の人の参考になれば幸いです。以上で記事を終わりにします。

## 参考文献

* [Mouse problem on second display using WS 10 (regression?) | VMware Technology Network VMTN](https://communities.vmware.com/t5/VMware-Workstation-Pro/Mouse-problem-on-second-display-using-WS-10-regression/m-p/2162294)