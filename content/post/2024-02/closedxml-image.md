---
title: 【C#】ClosedXMLでExcelに画像を埋め込む方法【余白・縮尺】
description: 今回はC#のClosedXMLでExcelに画像を埋め込む方法と、画像の位置をセル内で調整する方法、画像の縮尺を調整する方法を紹介します。
date: 2024-02-18
categories: 
  - 技術記事
tags: 
  - C#
archives:
    - 2024/02
thumbnail: /images/c-sharp.png
---

今回は**C#**の**ClosedXML**でExcelに画像を埋め込む方法と、画像の位置をセル内で調整する方法、画像の縮尺を調整する方法を紹介します。

## ClosedXMLでの画像の貼り付け

ClosedXMLはExcelがインストールされていない環境でExcelファイルを操作できるライブラリです。まず、ClosedXMLを使うには、ClosedXMLライブラリの追加と、プログラム行頭の`using`の記述が必要になります。

{{< code lang="c#" title="ClosedXMLのusingの記述" >}}
using ClosedXML.Excel;
using ClosedXML.Excel.Drawings;
{{< /code >}}

ClosedXMLでの画像の貼り付けには、`AddPictureメソッド`を使います。例として、ExcelファイルのA2セルに画像を貼り付けるサンプルコードを紹介します。

{{< code lang="c#" title="ClosedXMLの画像の貼り付け" >}}
private void pasteImage() {
 
    using (XLWorkbook wb = new XLWorkbook()){
        // ワークシートの設定
        IXLWorksheet ws = wb.AddWorksheet("Sheet1");
 
        // AddPictureメソッドで画像を貼り付け
        IXLPicture image = ws.AddPicture(@"C:\test\image.jpg");

        // 画像の位置をA2セルの左上に移動
        image.MoveTo(ws.Cell(2, 1));
 
        // ワークブックを保存
        wb.SaveAs(@"C:\test\excel.xlsx");
    }
}
{{< /code >}}

### 画像の位置をセル内で調整する方法

上記のサンプルコードでは`MoveTo`メソッドでセルを指定しており、セルの左上に合うように画像が移動されます。セル内で余白を持たせたい場合、引数を追加しxとyの余白をポイント単位で指定します。

{{< code lang="c#" title="MoveToメソッドで余白を指定" >}}
IXLPicture image = ws.AddPicture(@"C:\test\image.jpg");

// 画像を右に5ポイント、下に10ポイントずつずらす 
image.MoveTo(ws.Cell(2, 1), 5, 10);
{{< /code >}}

### 画像の縮尺を調整する方法

画像の縮尺を調整したい場合は、`Scale`メソッドを使います。引数に倍率を指定します。高さと幅を別々に調整したい場合は、それぞれ`ScaleHeight`メソッドと`ScaleWidth`メソッドを使います。

{{< code lang="c#" title="Scaleメソッドで縮尺を指定" >}}
IXLPicture image = ws.AddPicture(@"C:\test\image.jpg");

// 画像を等倍で0.5倍にする
image.Scale(0.5);

// 画像の高さを2倍にする
image.ScaleHeight(2);

// 画像の幅を2倍にする
image.ScaleWidth(2);
{{< /code >}}

* * *

今回はClosedXMLでのExcelの画像埋め込みについて紹介しました。以上で記事を終わりにします。

## 参考文献

* [ClosedXML.Excel.Drawings.XLPicture.MoveTo(IXLAddress, System.Drawing.Point) Example | CSharpCodi](https://www.csharpcodi.com/csharp-examples/ClosedXML.Excel.Drawings.XLPicture.MoveTo(IXLAddress,%20System.Drawing.Point)/)

* [ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double, bool) Example | CSharpCodi](https://www.csharpcodi.com/csharp-examples/ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double,%20bool)/)

* [ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double, bool) Example | CSharpCodi](https://www.csharpcodi.com/csharp-examples/ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double,%20bool)/)