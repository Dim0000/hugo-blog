---
title: 【SVN】更新時に「Checksum mismatch～」となるエラーを解決する
description: SVN（Subversion）で更新時に「Checksum mismatch～」のエラーが出る問題の対処方法をまとめます。
date: 2024-05-26
categories: 
  - 技術記事
tags: 
  - SVN
archives:
    - 2024/05
thumbnail: /images/app.webp
---

**SVN**（Subversion）で更新時に`Checksum mismatch～`のエラーが出る問題の対処方法をまとめます。

<!--more-->

## リポジトリ更新時に「Checksum mismatch～」のエラーが出る

使用クライアントは「[TortoiseSVN](https://tortoisesvn.net)」になります。

この前の話ですが、SVNで管理していたリポジトリを更新した時に、`Checksum mismatch～`とエラーになり更新ができませんでした。

しばらく触っておらず、久しぶりに更新したリポジトリだったのですが、クリーンアップしてから再度試してみてもダメ、ファイルやフォルダを削除して更新してもダメでした。

どうやら、リポジトリと作業フォルダとでチェックサムに差異があるとエラーになるようです。

## エラーの解決方法

リポジトリの更新が失敗し、クリーンアップも失敗する場合は、`.svn`フォルダ自体を差し替えることで治る場合があります。

1. エラーになるリポジトリと同じものを、新しく別の場所にチェックアウトする
2. チェックアウトしてきた`.svn`フォルダをエラーになるフォルダへ差し替える
3. 再度、リポジトリの更新を行う

私は以上の手順でエラーが解消されました。チェックアウトし直したので、少し時間が掛かりましたが…。

* * *

単にクリーンアップだけだと上手くいかない場合は試してみてください。Stack Overflowだと上記以外の方法もいくつか出ていたので、参考として載せておきます。以上で記事を終わりにします。

## 参考文献

* [SVN - Checksum mismatch while updating | Stack Overflow](https://stackoverflow.com/questions/10352934/svn-checksum-mismatch-while-updating)