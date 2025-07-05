---
title: 【C#/VB】ClosedXMLでExcelに画像プロパティを指定する方法
description: 今回はC#/VBのライブラリであるClosedXMLで、Excelの画像のプロパティを指定する方法を紹介します。
date: 2024-11-30
categories: 
  - 技術記事
tags: 
  - C#
  - VB
archives:
    - 2024/11
thumbnail: /images/c-sharp.webp
---

今回は**C#**/**VB**のライブラリである**ClosedXML**で、Excelの画像のプロパティを指定する方法を紹介します。

<!--more-->

## ClosedXMLでの画像の指定

Excelでは、画像（図形）の動作をセルに関連付けるプロパティで、画像がセルの移動やサイズ変更にどう反応するかを指定することができます。

ClosedXMLでは、そのプロパティを`XLPicturePlacement`で指定することができます。

{{< code lang="c#" title="Program.cs" >}}
// 画像を貼り付ける
IXLPicture image = ws.AddPicture(@"C:\test\image.jpg");

// 画像のプロパティを「セルに合わせて移動やサイズ変更をする」に指定する
image.Placement = XLPicturePlacement.MoveAndSize;

// 画像のプロパティを「セルに合わせて移動するがサイズ変更はしない」に指定する
image.Placement = XLPicturePlacement.Move;

// 画像のプロパティを「セルに合わせて移動やサイズ変更をしない」に指定する
image.Placement = XLPicturePlacement.FreeFloating;
{{< /code >}}

「セルに合わせて移動やサイズ変更をする」を指定すれば、セルの動作に画像が連動し、フィルター使用時も画像を連動させることができます。

## MoveAndSizeを指定する場合の注意点

`MoveAndSize`（セルに合わせて移動やサイズ変更をする）を指定する際、`moveメソッド`は以下の形式で指定する必要があります。

{{< code lang="c#" title="Program.cs" >}}
image.MoveTo(IXLCell fromCell, Point fromOffset, IXLCell toCell, Point toOffset)
{{< /code >}}

異なる形式を使うと、エクセルの画像がおかしくなることがあるようです。

* * *

今回はClosedXMLでのExcelの画像のプロパティを指定する方法について紹介しました。以上で記事を終わりにします。

## 参考文献

* [Enum XLPicturePlacement | SlapKit.Excel Documentation](https://docs.slapkit.com/excel/api/SlapKit.Excel.Excel.Drawings.XLPicturePlacement.html)

* [ClosedXML .Placement property. | GitHub](https://github.com/ClosedXML/ClosedXML/issues/971)