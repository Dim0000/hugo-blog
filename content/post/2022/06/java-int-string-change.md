---
title: 【Java】int型⇔String型の変換方法まとめ【推奨方法】
description: 今回はint型とString型の変換の方法について紹介します。方法は複数ありますが一番ノーマルで推奨されるやり方のみ取り上げます。
date: 2022-06-30
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/06
thumbnail: /images/java.webp
---

今回は`int型`と`String型`の変換の方法について紹介します。方法は複数ありますが一番ノーマルで推奨されるやり方のみ取り上げます。

<!--more-->

## int型→String型への変換方法

`int型`から`String型`へ変換するには、`Stringクラス`の`valueOfメソッド`を使います。書式は以下の通りです。

{{< code lang="java" title="valueOfメソッドの書式例" >}}
String str = String.valueOf(num);
{{< /code >}}

変数`num`の中身を変数`str`に代入することができます。

## String型→int型への変換方法

`String型`から`int型`へ変換するには`Integerクラス`の`parseIntメソッド`を使います。書式は以下の通りです。

{{< code lang="java" title="parseIntメソッドの書式例" >}}
int num = Integer.parseInt(str);
{{< /code >}}

変数`str`の中身を変数`num`に代入することができます。なお、以下のように`int型`に文字を入れようとすると`NumberFormatException`のエラーが出ます。

{{< code lang="java" title="parseIntメソッドの書式例" >}}
// NumberFormatExceptionエラーになる
int num = Integer.parseInt("a");
{{< /code >}}

## メソッドの使用例

上記の2つのメソッドの使用例をサンプルコードで示します。変数の型は`Classオブジェクト`の`getSimpleNameメソッド`で確認します。このメソッドは参照型のみ扱われるため、`int型`の判定は`Object型`にキャストを行っています。

{{< code lang="java" title="IntStringTest.java" >}}
public class IntStringTest {
  public static void main(String[] args) {
    String str1 = "123";
    int num1 = 321;
    System.out.println("str1:" + str1);
    System.out.println("str1の型:" + str1.getClass().getSimpleName());
    System.out.println("num1:" + num1);
    System.out.println("num1の型:" + ((Object) num1).getClass().getSimpleName());

    // int→Stingへ変換
    String str2 = String.valueOf(num1);
    System.out.println("str2:" + str2);
    System.out.println("str2の型:" + str2.getClass().getSimpleName());
    // Sting→intへ変換
    int num2 = Integer.parseInt(str1);
    System.out.println("num2:" + num2);
    System.out.println("num2の型:" + ((Object) num2).getClass().getSimpleName());
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
str1:123
str1の型:String
num1:321
num1の型:Integer
str2:321
str2の型:String
num2:123
num2の型:Integer
{{< /code >}}

型変換がされていることが分かります。以上で記事を終わりにします。

## 参考文献

* [String (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/String.html)

* [Integer (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Integer.html)

* [Class (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Class.html)