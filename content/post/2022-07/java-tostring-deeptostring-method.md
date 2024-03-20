---
title: 【Java】配列の中身を文字列で出力する方法【1次元・多次元配列】
description: 配列の中身を文字列に置き換えるには、ArrayクラスのtoStringメソッドとdeeptoStringメソッドを使います。今回は配列の要素を文字列に置き換えて出力する方法について紹介します。
date: 2022-07-01
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/07
thumbnail: /images/java.webp
---

配列の中身を文字列に置き換えるには、`Arrayクラス`の`toStringメソッド`と`deeptoStringメソッド`を使います。今回は配列の要素を文字列に置き換えて出力する方法について紹介します。

<!--more-->

## メソッドの書式

それぞれのメソッドの書式を以下に示します。

{{< code lang="java" title="メソッドの書式" >}}
// toStringメソッドの書式例
Arrays.toString(Object[] obj);

// deepToStringメソッドの書式例
Arrays.deepToString(Object[] obj);
{{< /code >}}

`toStringメソッド`を使うことで配列を文字列に置き換えることができます。`deepToStringメソッド`では多次元配列（2次元以上の配列）を文字列に置き換えることができます。

多次元配列とは、配列が入れ子構造になっている配列のことです。

{{< code lang="java" title="メソッドの書式" >}}
// 1次元配列
String[] str1 = { "10", "20", "30" };

// 2次元配列
String[][] str2 = { { "10", "20", "30" }, { "40", "50", "60" } };
{{< /code >}}

引数が`null`の場合は`null`を返します。

## メソッドの使用例

それぞれのメソッドの使用例をサンプルコードで紹介します。

{{< code lang="java" title="サンプルコード" >}}
import java.util.Arrays;

public class ToStringTest {
  public static void main(String[] args) {
    String[] str1 = { "10", "20", "30" };
    String[][] str2 = { { "10", "20", "30" }, { "40", "50", "60" } };
    String[] str3 = null;

    // toStringでstr1,str2,str3を出力する
    System.out.println("str1:" + Arrays.toString(str1));
    System.out.println("str2:" + Arrays.toString(str2));
    System.out.println("str3:" + Arrays.toString(str3));
    // deepToStringでstr1,str2,str3を出力する
    System.out.println("str1:" + Arrays.deepToString(str1));
    System.out.println("str2:" + Arrays.deepToString(str2));
    System.out.println("str3:" + Arrays.deepToString(str3));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
str1:[10, 20, 30]
str2:[[Ljava.lang.String;@4517d9a3, [Ljava.lang.String;@372f7a8d]
str3:null
str1:[10, 20, 30]
str2:[[10, 20, 30], [40, 50, 60]]
str3:null
{{< /code >}}

多次元配列を`toStringメソッド`で出力すると、配列への参照が表示されます。

## 参考文献

* [Arrays (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/util/Arrays.html)