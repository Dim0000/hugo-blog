---
title: 【Java】mismatchメソッドで2つの配列の違いを探す方法
description: Javaで2つの配列の違いを探す時には、Arraysクラスのmismatchメソッドを使うことができます。今回はmismatchメソッドの使い方を解説します。
date: 2024-12-13
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2024/12
thumbnail: /images/java.webp
---

Javaで2つの配列の違いを探す時には、`Arraysクラス`の`mismatchメソッド`を使うことができます。今回は`mismatchメソッド`の使い方を解説します。

<!--more-->

## mismatchメソッドの書式

`mismatchメソッド`は以下の様に記述します。

{{< code lang="java" title="mismatchメソッドの書式例" >}}
Arrays.mismatch(Array a, Array b);
{{< /code >}}

配列aと配列bを比較して、**最初に一致しなかった要素の添え字**を戻します。一致した場合は`‐1`を返します。また、配列の添え字は`int型`なので、返り値の型も`int型`になります。

また、`mismatchメソッド`は`equalsメソッド`とは違い、違っている最初の箇所を戻してくれます。

引数が`NULL`の時は`NullPointerException`の例外が発生します。

## メソッドの使用例

使用例をサンプルコードによって紹介します。

{{< code lang="java" title="MismatchTest1.java" >}}
import java.util.Arrays;

public class MismatchTest1 {

  public static void main(String[] args) {

    int[] num1 = { 1, 2, 3, 4, 5, 6 };
    int[] num2 = { 1, 2, 3, 5, 4, 6 };
    int[] num3 = { 1, 2, 3, 4, 5, 6 };

    // num1,num2を比較する。添え字3の要素が違うので3が返される
    System.out.println(Arrays.mismatch(num1, num2));

    // num1,num2を比較する。一致しているので-1が返される
    System.out.println(Arrays.mismatch(num1, num3));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
3   // { 1, 2, 3, 4, 5, 6 }と{ 1, 2, 3, 5, 4, 6 }の比較
-1　// 同じ配列の比較
{{< /code >}}

## 配列の全ての要素を検索する

このメソッドを普通に使うと最初に出てきた文字の位置しか返ってきません。そこでfor文を使って全ての文字を検索する方法を作ってみます。以下にサンプルコードを示します。

{{< code lang="java" title="MismatchTest2.java" >}}
import java.util.Arrays;

public class MismatchTest2 {

  public static void main(String[] args) {
    int[] num1 = { 1, 2, 3, 4, 5, 6 };
    int[] num2 = { 1, 2, 3, 5, 4, 6 };
    int[] num3 = Arrays.copyOf(num1, num1.length);
    int[] num4 = Arrays.copyOf(num2, num2.length);
    int index, sum = 0;
    System.out.println(Arrays.toString(num3));
    System.out.println(Arrays.toString(num4));

    for (int i = 0; i < num1.length; i++) {
      index = Arrays.mismatch(num1, num2);
      if (index != -1) {
        System.out.println(sum + 1 + "個目:" + (index + 1));
        i = index;
        sum++;
        num1[i] = 0;
        num2[i] = 0;
      }
    }
    System.out.println("該当個数:" + sum);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
[1, 2, 3, 4, 5, 6] // 元の配列1
[1, 2, 3, 5, 4, 6] // 元の配列2
1個目:4
2個目:5
該当個数:2
{{< /code >}}

一応全ての要素を検索できるようになっていますが、元の配列の要素を変更しているため、出力後の配列`num1`と`num2`の中身は最初と異なってしまいます。

よって、`Arrays.copyOfメソッド`を使って配列の要素を`num3`と`num4`にコピーしています。

* * *

今回は`mismatchメソッド`の使い方を紹介しました。以上で記事を終わりにします。

## 参考文献

 * [Arrays (Java SE 9 & JDK 9 )](https://docs.oracle.com/javase/jp/9/docs/api/java/util/Arrays.html#mismatch-int:A-int:A-)