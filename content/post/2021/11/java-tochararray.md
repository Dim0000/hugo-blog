---
title: 【Java】toCharArrayメソッドで文字列を配列に分割する
description: JavaのtoCharArrayメソッドを使って、String型の文字列をChar型の配列に変換する方法についてまとめていきます。
date: 2021-11-13
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2021/11
thumbnail: /images/java.webp
---

**Java**の`toCharArrayメソッド`を使って、`String型`の文字列を`Char型`の配列に変換する方法についてまとめていきます。

<!--more-->

## toCharArrayメソッドの書式

toCharArrayメソッドは以下のように記述します。

```java {lineNos="inline", name="toCharArrayメソッドの書式例"}
String str = "hello";
char[] cArray;
cArray = str.toCharArray();
```

`変数str`の文字列が1文字ずつ分割され、`配列cArray`に代入されます。

## toCharArrayメソッドの使用例

メソッドの使用例をサンプルコードで示します。

```java {lineNos="inline", name="ToCharArrayTest.java"}
public class ToCharArrayTest {
  public static void main(String[] args) {
    String str1 = "hello";
    char[] cArray;
    cArray = str1.toCharArray();
    for (char c : cArray) {
      System.out.print(c);
    }
    System.out.println();

    String str2 = "あいうえおかきくけこ";
    cArray = str2.toCharArray();
    for (char c : cArray) {
      System.out.print(c);
    }
    System.out.println();
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
hello
あいうえおかきくけこ
```

`変数cArray`に`hello`と`あいうえおかきくけこ`が1文字ずつ分割され、順番に格納されていることが分かります。アルファベットでも日本語でも同様の処理を実行します。

* * *

今回はJavaの`toCharArrayメソッド`について紹介しました。以上で記事を終わりにします。

## 参考文献

 * [String (Java Platform SE 8 )](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/String.html)