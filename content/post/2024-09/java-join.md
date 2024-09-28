---
title: 【Java】joinメソッドで文字列を配列に分割する
description: 今回はJavaのjoinメソッドを使って、文字列を結合する方法についてまとめていきます。
date: 2024-09-28
categories: 
  - 技術記事
tags: 
  - Java
archives:
    - 2024/09
thumbnail: /images/java.webp
---

今回はJavaの`joinメソッド`を使って、文字列を結合する方法についてまとめていきます。

<!--more-->

## joinメソッドの書式

メソッドは以下のように記述します。

{{< code lang="java" title="joinメソッドの書式例" >}}
String.join(デリミタ, 文字列1, 文字列2);
{{< /code >}}

第1引数をデリミタになり、第2引数以降をデリミタで結合します。デリミタとは、要素と要素の区切りとなる文字のことです。

引数が`NULL`の時は`NullPointerException`の例外が発生します。

## toCharArrayメソッドの使用例

メソッドの使用例をサンプルコードで示します。

{{< code lang="java" title="JoinTest.java" >}}
public class JoinTest {
  public static void main(String[] args) {
    String str = String.join(",", "a", "b", "c");
    System.out.println(str);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
a,b,c
{{< /code >}}

`,`をデリミタとして、`a`・`b`・`c`が結合されていることが分かります。

* * *

今回はJavaの`joinメソッド`について紹介しました。以上で記事を終わりにします。

## 参考文献

 * [String (Java Platform SE 8 )](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/String.html)
