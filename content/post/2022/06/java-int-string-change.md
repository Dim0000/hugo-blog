---
title: 【Java】int型⇔String型の変換【推奨方法】
description: Javaのint型とString型の変換の方法について、一番ノーマルで推奨されるやり方を紹介します。
date: 2022-06-30
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/06
thumbnail: /images/java.webp
---

**Java**の`int型`と`String型`の変換の方法について、一番ノーマルで推奨されるやり方を紹介します。

<!--more-->

## int型→String型への変換方法

`int型`から`String型`へ変換するには、`Stringクラス`の`valueOfメソッド`を使います。書式は以下の通りです。

```java {lineNos="inline", name="valueOfメソッドの書式例"}
String str = String.valueOf(num);
```

変数`num`の中身を変数`str`に代入することができます。

## String型→int型への変換方法

`String型`から`int型`へ変換するには`Integerクラス`の`parseIntメソッド`を使います。書式は以下の通りです。

```java {lineNos="inline", name="parseIntメソッドの書式例"}
int num = Integer.parseInt(str);
```

変数`str`の中身を変数`num`に代入することができます。なお、以下のように`int型`に文字を入れようとすると`NumberFormatException`のエラーが出ます。

```java {lineNos="inline", name="parseIntメソッドの書式例"}
// NumberFormatExceptionエラーになる
int num = Integer.parseInt("a");
```

## メソッドの使用例

上記の2つのメソッドの使用例をサンプルコードで示します。変数の型は`Classオブジェクト`の`getSimpleNameメソッド`で確認します。このメソッドは参照型のみ扱われるため、`int型`の判定は`Object型`にキャストを行っています。

```java {lineNos="inline", name="IntStringTest.java"}
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
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
str1:123
str1の型:String
num1:321
num1の型:Integer
str2:321
str2の型:String
num2:123
num2の型:Integer
```

型変換がされていることが分かります。以上で記事を終わりにします。

## 参考文献

* [String (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/String.html)

* [Integer (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Integer.html)

* [Class (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Class.html)