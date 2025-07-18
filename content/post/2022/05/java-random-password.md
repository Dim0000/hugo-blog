---
title: 【Java】ランダムな文字列（パスワード）を生成してみる
description: Javaでランダムな文字列（パスワード）を生成するプログラムを書いてみます。
date: 2022-05-18
categories:
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/05
thumbnail: /images/java.webp
---

**Java**でランダムな文字列（パスワード）を生成するプログラムを書いてみます。

<!--more-->

## 実装したいこと

このプログラムで実現したいこととして、以下の3つの機能を実装してみたいと思います。

{{< box "実装したいこと" >}}
* 文字数を指定してランダムな文字列を生成する
* 使う文字種はアルファベット（小文字）を基本とする
* アルファベットの大文字と数字も使えるようにする
{{< /box >}}

## プログラムの実装

実際に書いてみました。`StringBuilderクラス`でパスワードに使う文字種を提示して、`Randomクラス`でランダムに文字列を選びだして生成していきます。

{{< box "実装したいこと" >}}
* [](java-random-number)
{{< /box >}}

```java {lineNos="inline", name="MakePassword.java"}
import java.util.Random;

public class MakePassword {

  /** 実行用mainメソッド */
  public static void main(String[] args) {
    System.out.println(makePassword(10, true, true));
  }

  /** パスワードを作成 */
  private static StringBuilder makePassword(int length, boolean uppercaseFlg, boolean digitFlg) {
    StringBuilder lowercase = new StringBuilder("abcdefghijklmnopqrstuvwxyz");
    StringBuilder uppercase = new StringBuilder("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    StringBuilder digit = new StringBuilder("0123456789");

    if (uppercaseFlg) {
      lowercase.append(uppercase);
    }
    if (digitFlg) {
      lowercase.append(digit);
    }

    StringBuilder password = new StringBuilder();

    Random rand = new Random();
    for (int i = 0; i < length; i++) {
      int num = rand.nextInt(lowercase.length());
      password.append(lowercase.charAt(num));
    }

    return password;
  }
}
```

実行結果の一例が以下になります。

```plaintext {lineNos="inline", name="出力結果（一例）"}
qcFnJWtL8B
```

パスワードを生成することができました。

* * *

ランダムクラスを使うことで、ランダムパスワードが作れますね。追加機能なども考えてみたいです。以上で記事を終わりにします。