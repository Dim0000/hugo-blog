---
title: 【Java】メソッドと関数の違いについて考えてみる【C言語】
description: プログラミングにおけるメソッドと関数との違いについて、JavaとC言語を例にして考えたいと思います。
date: 2021-10-19
categories: 
  - 技術記事
tags: 
  - Java
  - C
archives: 
  - 2021/10
thumbnail: /images/java.webp
---

プログラミングにおける**メソッド**と**関数**との違いについて、JavaとC言語を例にして考えたいと思います。

<!--more-->

例えば、C言語では特定の処理のことを関数と呼びますが、Javaではメソッドと言われていますね。関数、メソッドとは一体何なのか考えてみます。

## メソッドとは

メソッド（method）とは何なのでしょうか？意味を調べてみます。

>メソッドとは、オブジェクト指向プログラミングにおける、特定のクラスやオブジェクトに属する、特定の処理をひとまとまりにしたサブルーチンのことである。「method」という単語は、一般的な英単語としては「手段」「方法」などを意味する。
>
>特に、Javaのように、全てのサブルーチンが何らかのクラスに属するプログラミング言語でメソッドという言葉が使われる。[^a]

[^a]:[IT用語辞典バイナリ:メソッド](https://www.sophia-it.com/content/%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89)

Javaには様々なメソッドが用意されています。具体的な例を挙げると、`System.out.println("hello java");`のような`Sysout文`はメソッドになります。

また、メソッドを新しく作りたい時は以下のように記述します。Javaの`mainメソッド`もその名の通りメソッドの一部になります。

```java {lineNos="inline", name="メソッド"}
アクセス修飾子 戻り値の型 メソッド名(引数の型 引数) {
　// 処理
}

public static void main(String[] args) {
　// 処理
}
```

## 関数とは

関数（function）とは数学でよく使われる単語ですよね。メソッドとは何が違うのでしょうか？意味を調べてみます。

>関数とは、入力された値に対してある決まった内容の計算を行い、入力された値に応じた処理結果を返す、数式、あるいは命令の集まりのことである。
>
>プログラミング言語などにおいては、使用頻度の高い処理手続きは関数としてあらかじめ用意されていることが多い。関数に入力する値は「引数」と呼ばれる。引数は、関数の種類によっては数値でなく文字列などが使用される場合もある。[^b]

[^b]:[IT用語辞典バイナリ:関数](https://www.sophia-it.com/content/%E9%96%A2%E6%95%B0)

試しにJavaで例を挙げてみます。

```java {lineNos="inline", name="FunctionTest.java"}
public class FunctionTest {
  public static void main(String[] args) {
    int i = square(5);
    System.out.println(i);
  }

  public static int square(int num) {
    return num * num;
  }
}
```

上のコードの出力結果は`25`になります。

ここで関数は`square`ですね。引数に5が渡されて2乗される処理が行われ、その結果である25が返されています。

しかし上にもある通り、`squareメソッド`を新しく定義して記述しているため、これはメソッドとも言えます。

## 結局メソッドと関数は同じ？

メソッドとは上の引用にもある通り**オブジェクト指向型言語において、オブジェクトの一部として定義されている関数**のことであるということです。

Javaはオブジェクト指向型言語であるため、関数という呼び名の代わりにメソッドの呼び名が使われています。つまり、**メソッドと関数は同じものとして扱われる**ということです。

* * *

ここまで、メソッドと関数の違いについてまとめてみました。以上で記事を終わりにします。