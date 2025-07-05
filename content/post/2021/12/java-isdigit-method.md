---
title: 【Java】isDigitメソッドで文字が数字かどうか判定する方法
description: CharacterクラスのisDigitメソッドを使うことで、文字が数字かどうかの判定が出来ます。メソッドの書式・使用例の紹介と、String型文字列から全ての数字を抽出する方法についてまとめます。
date: 2021-12-15
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2021/12
thumbnail: /images/java.webp
---

`Characterクラス`の`isDigitメソッド`を使うことで、文字が数字かどうかの判定が出来ます。メソッドの書式・使用例の紹介と、`String型文字列`から全ての数字を抽出する方法についてまとめます。

<!--more-->

## isDigitメソッドの書式

`isDigitメソッド`は、以下の様に記述します。

{{< code lang="java" title="isDigitメソッドの書式例" >}}
Character.isDigit(char ch);
{{< /code >}}

引数の文字を比較して数字（0~9のみで構成される）であれば`ture`、そうでなければ`false`を返します。戻り値の型は`boolean型`です。

引数は`char型`（もしくは`int型`）のみ適用され、`String型`や`NULL`を入れるとコンパイルエラーになります。

似たようなメソッドで、小文字のアルファベットかどうか判定する`isLowerCaseメソッド`があります。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-islowercase-method" >}}</li>
</ul>
{{< /box >}}

## メソッドの使用例

`isDigitメソッド`の使用例をサンプルコードで紹介します。

{{< code lang="java" title="IsDigitTest1.java" >}}
public class IsDigitTest1 {
  public static void main(String[] args) {

    // 0,Aがそれぞれ数字かどうか判定する
    System.out.println("0の数値判定:" + Character.isDigit('0'));
    System.out.println("Aの数値判定:" + Character.isDigit('A'));

    // 全角数字とひらがなと空文字を判定する
    System.out.println("０の数値判定:" + Character.isDigit('０'));
    System.out.println("あの数値判定:" + Character.isDigit('あ'));
    System.out.println(" の数値判定:" + Character.isDigit(' '));
    System.out.println(",の数値判定:" + Character.isDigit(','));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
0の数値判定:true
Aの数値判定:false
０の数値判定:true
あの数値判定:false
 の数値判定:false
,の数値判定:false
{{< /code >}}

半角英数字の判定だけではなく、全角の数字や平仮名や空白文字に対しても数字かどうか判定されます。

## 文字列から全ての数字を検索する方法

通常は`char型`の文字だけしか検索できないので、`for文`を使って`String型`の文字列から含まれる全ての数字を検索するプログラムを作成してみます。

サンプルコードを以下に示します。`String型`を`char型`に分割するために、`toCharArrayメソッド`を使用しています。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-tochararray" >}}</li>
</ul>
{{< /box >}}

{{< code lang="java" title="IsDigitTest2.java" >}}
public class IsDigitTest2 {
  public static void main(String[] args) {
    String str = "abc123def";
    char[] c = str.toCharArray();
    int sum = 0;
    System.out.println("元の文字列:" + str);

    for (int i = 0; i < str.length(); i++) {
      if (Character.isDigit(c[i])) {
        System.out.println("数字:" + c[i] + " 場所:" + (i + 1));
        sum++;
      }
    }
    System.out.println("該当個数:" + sum);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
元の文字列:abc123def
数字:1 場所:4
数字:2 場所:5
数字:3 場所:6
該当個数:3
{{< /code >}}

文字列から全ての数字を抽出することができました。ただ、文字列を1文字ずつに分割しているため、`123`は`1`・`2`・`3`として出力されてしまいます。

* * *

今回は`isDigitメソッド`の使い方を紹介しました。以上で記事を終わりにします。

## 参考文献

* [Character (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Character.html)