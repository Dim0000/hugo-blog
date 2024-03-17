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
thumbnail: /images/c-sharp.webp
---

今回は<strong>C#</strong>のライブラリである**ClosedXML**でExcelに画像を埋め込む方法と、画像の位置をセル内で調整する方法、画像の縮尺を調整する方法を紹介します。

<!--more-->

## ClosedXMLでの画像の貼り付け

ClosedXMLはExcelがインストールされていない環境でExcelファイルを操作できるライブラリです。まず、ClosedXMLを使うには、ClosedXMLライブラリの追加と、プログラム行頭の`using`の記述が必要になります。

{{< code lang="c#" title="usingの記述" >}}
using ClosedXML.Excel;
using ClosedXML.Excel.Drawings;
{{< /code >}}

ClosedXMLでの画像の貼り付けには、`AddPictureメソッド`を使います。例として、ExcelファイルのA2セルに画像を貼り付けるサンプルコードを紹介します。

{{< code lang="c#" title="Program.cs" >}}
using ClosedXML.Excel;
using ClosedXML.Excel.Drawings;

class Program
{
  static void Main(string[] args)
  {
    using (XLWorkbook wb = new XLWorkbook()){
      // ワークシートの設定
      IXLWorksheet ws = wb.AddWorksheet("Sheet1");
 
      // AddPictureメソッドで画像を貼り付け
      IXLPicture image = ws.AddPicture(@"test.png");

      // 画像の位置をB2セルの左上に移動
      image.MoveTo(ws.Cell(2, 2));
 
      // ワークブックを保存
      wb.SaveAs(@"excel.xlsx");
    }
  }
}   
{{< /code >}}

コードを実行し、作成したエクセルのスクリーンショットになります。

{{< luminous src="/images/closedxml-image-01.png" caption="ClosedXMLでの画像貼り付け">}}

### 画像の位置をセル内で調整する方法

上記のサンプルコードでは`MoveTo`メソッドでセルを指定しており、セルの左上に合うように画像が移動されます。セル内で余白を持たせたい場合、引数を追加しxとyの余白をポイント単位で指定します。

{{< code lang="c#" title="Program.cs" >}}
IXLPicture image = ws.AddPicture(@"C:\test\image.jpg");

// 画像を右・下に10ポイントずつずらす 
image.MoveTo(ws.Cell(2, 2), 10, 10);
{{< /code >}}

{{< luminous src="/images/closedxml-image-02.png" caption="画像の位置の調整">}}

最初と比べ、画像の位置が微妙に変化したことが分かります。

### 画像の縮尺を調整する方法

画像の縮尺を調整したい場合は、`Scale`メソッドを使います。引数に倍率を指定します。高さと幅を別々に調整したい場合は、それぞれ`ScaleHeight`メソッドと`ScaleWidth`メソッドを使います。

{{< code lang="c#" title="Program.cs" >}}
IXLPicture image = ws.AddPicture(@"C:\test\image.jpg");

// 画像を等倍で0.5倍にする
image.Scale(0.5);

// 画像の高さを2倍にする
image.ScaleHeight(2);

// 画像の幅を2倍にする
image.ScaleWidth(2);
{{< /code >}}

等倍で0.5倍とすると、画像が小さくなったことが分かります。

{{< luminous src="/images/closedxml-image-03.png" caption="画像の縮尺の調整">}}

* * *

今回はClosedXMLでのExcelの画像埋め込みについて紹介しました。以上で記事を終わりにします。

## 参考文献

* [ClosedXML.Excel.Drawings.XLPicture.MoveTo(IXLAddress, System.Drawing.Point) Example | CSharpCodi](https://www.csharpcodi.com/csharp-examples/ClosedXML.Excel.Drawings.XLPicture.MoveTo(IXLAddress,%20System.Drawing.Point)/)

* [ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double, bool) Example | CSharpCodi](https://www.csharpcodi.com/csharp-examples/ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double,%20bool)/)

* [ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double, bool) Example | CSharpCodi](https://www.csharpcodi.com/csharp-examples/ClosedXML.Excel.Drawings.XLPicture.ScaleHeight(double,%20bool)/)