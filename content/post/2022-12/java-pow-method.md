---
title: 【Java】powメソッドでべき乗（累乗）を求める方法
description: Javaでべき乗（累乗）を求めるには、Mathクラスのpowメソッドが便利です。 メソッドの使い方などを紹介していきます。
date: 2022-12-20
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/12 
thumbnail: /images/java.webp
mathjax: true
---

Javaで**べき乗**（累乗）を求めるには、`Mathクラス`の`powメソッド`が便利です。 メソッドの使い方などを紹介していきます。

<!--more-->

べき乗とは、 \\(a^{n}\\) のような \\(a\\) の \\(n\\) 乗で表せる数のことです。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-sqrt-method" >}}</li>
</ul>
{{< /box >}}

## powメソッドの書式

メソッドの書式は以下になります。

{{< code lang="java" title="powメソッドの書式" >}}
Math.pow(double a, double b);
{{< /code >}}

`a`が底、`b`が指数になります。底を10、指数を2とすると、\\(10^{2}=100\\)なので、戻り値は100が返されます。また、戻り値は`double型`で返されます。

底か指数が`NaN`の場合は`NaN`が返されます。指数が`0`の場合は`1.0`が返されます。

## powメソッドの使用例

べき乗を求めるサンプルプログラムを、for文を使うパターンと`powメソッド`を使うパターンの両方でサンプルコードで示します。

{{< code lang="java" title="PowTest.java" >}}
public class PowTest {
  public static void main(String[] args) {
    // for文で5の3乗を求める
    int num1 = 1, num2 = 5;
    for (int i = 0; i <= 2; i++) {
      num1 *= num2;
    }
    System.out.println("5の3乗（for文）:" + num1);

    // powメソッドで5の3乗を求める
    double num3 = Math.pow(5, 3);
    // double型をint型に変換して出力する
    System.out.println("5の3乗（powメソッド）:" + (int) num3);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
5の3乗（for文）:125
5の3乗（powメソッド）:125
{{< /code >}}

`powメソッド`を使った方が1行で書けるため、コードがすっきりして見やすいですね。

* * *

今回は`powメソッド`の使い方の紹介でした。

そもそも、Javaではべき乗の演算子は無いのが特徴になります。`^`はJavaでは排他的論理和（XOR）演算子ですので、べき乗だと思って使用すると違った結果となります。他言語だと、JavaScriptなんかでは`**`が演算子となっていますね。

以上で記事を終わりにします。

## 参考文献

* [Math (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Math.html)