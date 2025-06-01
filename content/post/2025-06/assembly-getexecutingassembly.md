---
title: 【Visual Studio】ファイルを埋め込みリソースとして読み込む際の注意点
description: 今回はVisual Studioでファイルを埋め込みリソースとして読み込む際の注意点についての記事になります。
date: 2025-06-01
categories: 
  - 技術記事
tags: 
  - C#
  - VB
archives:
    - 2025/06
thumbnail: /images/c-sharp.webp
---

今回は**Visual Studio**でファイルを**埋め込みリソース**として読み込む際の注意点についての記事になります。

<!--more-->

## 埋め込みリソースについて

画像やテキストファイルを実行ファイルに埋め込んでビルドする手法があります。

具体的には、`Assembly.GetExecutingAssembly()`を使ってアセンブリの情報を取得します。メソッドは以下の様に使うことができます。

{{< code lang="c#" title="Program.cs" >}}
var assembly = Assembly.GetExecutingAssembly();
var resourceName = "MyNamespace.folder.filename.txt";

using (Stream stream = assembly.GetManifestResourceStream(resourceName))
using (StreamReader reader = new StreamReader(stream))
{
    string content = reader.ReadToEnd();
}
{{< /code >}}

上記のコードではテキストファイルを読み込みこんでいます。

## 注意点

ここで、注意点として、Visual Studioではリソースファイルの「**ビルドアクション**」を「**埋め込みリソース**（Embedded Resource）」に設定しておく必要があります。

この設定ができていない（「コンテンツ」や「なし」になっている）とリソースを読み込みしてくれないので気をつけましょう。

* * *

今回はVisual Studioでファイルを埋め込みリソースとして読み込む方法について紹介しました。以上で記事を終わりにします。

## 参考文献

* [Assembly.GetExecutingAssembly メソッド | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/api/system.reflection.assembly.getexecutingassembly?view=net-9.0)