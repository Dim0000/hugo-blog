---
title: 【Java】変数における同一性と同値性の違いを解説
description: 今回はJavaの変数における同一性と同値性の違いについて、分かりやすくまとめてみたいと思います。
date: 2022-02-25
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/02
thumbnail: /images/java.webp
---

今回はJavaの変数における**同一性**と**同値性**の違いについて、分かりやすくまとめてみたいと思います。

<!--more-->

## 同一性とは

変数の同一性とは、その変数が**同じインスタンスである**ことを指します。インスタンスを分かりやすく説明するのは難しいですが、クラスを設計図とするならば、インスタンスとはそれぞれ個性を持つ実体の様なものです。クラスのインスタンスを生成するというのは、言い換えれば設計図から実体を作るという意味合いを持ちます。

例えば、下のような変数`str1`、`str2`がある時、2つの変数は同じインスタンスを共有して参照しています。

{{< code lang="java" title="変数の同一性" >}}
String str1 = "ABC";
String str2 = str1;
{{< /code >}}

つまり、**この2つの変数は同一である**と言えます。

付け加えると、`Stringクラス`は同じ文字列が代入された場合、同じ参照先が使い回されます。これは参照先が増えるのを防ぐためで、この仕組みを**コンスタントプール**（Constant Pool）と呼ばれています。

コンスタントプールにより下のような変数`str3`、`str4`は同じ参照先を参照しているので同一性を持ちます。

{{< code lang="java" title="変数の同一性" >}}
String str3 = "abc";
String str4 = "abc";
{{< /code >}}

同一性であるかを判定するのには、`==演算子`を使います。サンプルコードに同一性を判定するコードを書いてみます。

{{< code lang="java" title="IdentityTest.java" >}}
public class IdentityTest {
  public static void main(String[] args) {
    // str1とstr2が同一であるか判定する
    String str1 = "ABC";
    String str2 = str1;
    System.out.println("str1とstr2の同一性:" + (str1 == str2));
    // str3とstr4が同一であるか判定する
    String str3 = "abc";
    String str4 = "abc";
    System.out.println("str3とstr4の同一性:" + (str3 == str4));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
str1とstr2の同一性:true
str3とstr4の同一性:true
{{< /code >}}

`str1`と`str2`、`str3`と`str4`は同一であることがわかります。

## 同値性とは

**同値性**とは、インスタンスが持つ値の内容が同じであることを意味します。

{{< code lang="java" title="変数の同値性" >}}
String str1 = new String("ABC");
String str2 = new String("ABC");
{{< /code >}}

上の`str1`と`str2`は`new演算子`で異なるインスタンスを生成して、「ABC」を代入しています。値自体はそれぞれ同じ文字列を代入しています。

よって、**2つの変数は同一ではないが同値である**と言えます。

同値性を判定するには、`Objectクラス`の`equalsメソッド`を使います。サンプルコードに同値性を判定するコードを書いてみます。

{{< code lang="java" title="サンプルコード" >}}
public class EquivalenceTest {
  public static void main(String[] args) {
    String str1 = new String("ABC");
    String str2 = new String("ABC");
    // str1とstr2が同一であるか判定する
    System.out.println("str1とstr2の同一性:" + (str1 == str2));
    // str1とstr2が同値であるか判定する
    System.out.println("str1とstr2の同値性:" + str1.equals(str2));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
str1とstr2の同一性:false
str1とstr2の同値性:true
{{< /code >}}

上の通り、同一性判定は`false`ですが、同値性判定は`true`であることが分かります。

## 同一性と同値性の違い

上で述べた同一性と同値性の違いについてですが、これらは変数の型が**基本データ型**ではなく、**参照型**の場合のみ発生します。

基本データ型は同一性のみ比較される（同一性と同値性が一緒に扱われる）ので、基本データ型で同値性と同値性は違いは発生しません。

変数を比較する場合では、基本データ型では`==演算子`、参照型では`equalsメソッド`を使えば良いということです。

* * *

今回は同一性と同値性の違いを簡単にまとめました。Java Silverの試験でも問われることが多いトピックなので、アウトプットとして解説してみました。以上で記事を終わりにします。

## 参考文献

* [Object (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Object.html)