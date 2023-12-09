---
title: 【Java】ランダムな文字列（パスワード）を生成してみる
description: 今回はJavaでランダムな文字列（パスワード）を生成するプログラムを書いてみたいと思います。
date: 2022-05-18
lastmod: 2023-11-01
categories:
  - IT制作物
tags: 
  - Java
archives: 
  - 2022/05
thumbnail: /images/java.png
# draft: false
---

今回はJavaでランダムな文字列（パスワード）を生成するプログラムを書いてみたいと思います。

## 実装したいこと

このプログラムで実現したいこととして、以下の3つの機能を実装してみたいと思います。

{{< box "実装したいこと" >}}
<ul>
<li>文字数を指定してランダムな文字列を生成する</li>
<li>使う文字種はアルファベット（小文字）を基本とする</li>
<li>アルファベットの大文字と数字も使えるようにする</li>
</ul>
{{< /box >}}

## プログラムの実装

実際に書いてみました。`StringBuilderクラス`でパスワードに使う文字種を提示して、`Randomクラス`でランダムに文字列を選びだして生成していきます。

{{< box "実装したいこと" >}}
<ul>
<li>{{< ref "/java-random-number" >}}</li>
</ul>
{{< /box >}}

{{< code lang="java" title="サンプルコード" >}}
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
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
qcFnJWtL8B
{{< /code >}}

パスワードを生成することができました。

* * *

ランダムクラスを使うことでランダムなパスワードが作れますね。追加機能なども考えていきたいです。以上で記事を終わりにします。