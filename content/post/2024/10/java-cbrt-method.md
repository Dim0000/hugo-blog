---
title: 【Java】cbrtメソッドで立方根を求める
description: JavaのMathクラスのcbrtメソッドで立方根を求める方法を紹介します。
date: 2024-10-31
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2024/10
thumbnail: /images/java.webp
mathjax: true
---

**Java**の`Mathクラス`の`cbrtメソッド`で**立方根**を求める方法を紹介します。

<!--more-->

なお、立方根とは数 \\(a\\) があるとき、3乗して \\(a\\) になるような数のことを指します。つまり \\(x^{3}=a\\) を満たす数 \\(x\\) が \\(a\\) の立方根になります。

## cbrtメソッドの書式

メソッドの書式は以下になります。

```java {lineNos="inline", name="cbrtメソッドの書式"}
Math.cbrt(double a);
Math.cbrt(8); // 2が返る
```

引数の立方根が返ってきます。戻り値の型は`double型`になります。

正の無限大の時は正の無限大がそのまま返されます。また、引数が負の数値である場合は`NaN`（Not a Number/非数）を返します（`NaN`が引数の時も同様です）。

似た機能を持つメソッドに、平方根を計算する`sqrtメソッド`があるので注意しましょう。

{{< box "関連記事" >}}
* [](java-sqrt-method)
{{< /box >}}

## メソッドの使用例

メソッドの使用例をサンプルコードで示します。

```java {lineNos="inline", name="CbrtTest.java"}
public class CbrtTest {
  public static void main(String[] args) {
    System.out.println("8の立方根:" + Math.cbrt(8));
    System.out.println("27.0の立方根:" + Math.cbrt(27.0));
    System.out.println("10の立方根:" + Math.cbrt(10));
    System.out.println("-1の立方根:" + Math.cbrt(-1));
    System.out.println("0の立方根:" + Math.cbrt(0));
    System.out.println("正の無限大の立方根:" + Math.cbrt(Double.POSITIVE_INFINITY));
    System.out.println("NaNの立方根:" + Math.cbrt(Double.NaN));
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
8の立方根:1.5874010519681996
27.0の立方根:3.0
10の立方根:2.154434690031884
-1の立方根:-1.0
0の立方根:0.0
正の無限大の立方根:Infinity
NaNの立方根:NaN
```

それぞれの数字の立方根が、`double型`で出力されていることが分かります。

* * *

今回は`cbrtメソッド`の使い方を紹介してました。以上で記事を終わりにします。

## 参考文献

* [Math (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Math.html)