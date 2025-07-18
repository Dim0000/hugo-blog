---
title: 【Java】shuffleメソッドでコレクションをシャッフルする
description: JavaのCollectionsクラス`のshuffleメソッドについて使い方などをまとめます。
date: 2021-07-22
categories:
  - 技術記事
tags: 
  - Java
archives: 
  - 2021/07
thumbnail: /images/java.webp
---

**Java**の`Collectionsクラス`の`shuffleメソッド`について使い方などをまとめます。

<!--more-->

## shuffleメソッドについて

`shuffleメソッド`とは、`List`などのコレクションをシャッフルするためのメソッドです。内部で生成された乱数を使って、コレクションがシャッフルされます。

```java {lineNos="inline", name="shuffleメソッドの書式例"}
Collections.shuffle(List<?> list);
Collections.shuffle(List<?> list, Random rnd);
```

引数はシャッフルしたいコレクションの他、`Randomクラス`のオブジェクトを第2引数に指定することができます。その場合はシャッフルするための乱数を指定することができます。

また、ランダムに数字を出力したい場合にも、`Randomクラス`を使うことができます。こちらは数字の範囲を指定して、ランダムに出力させることができますが、数字が重複する可能性があります。

{{< box "関連記事" >}}
* [](java-random-number)
{{< /box >}}

対して、`shuffleメソッド`は`List`で指定した数字を1つずつ使った重複しないリストを簡単に作ることができます。また、文字列等もシャッフルすることが可能です。

なお、配列には`shuffleメソッド`が使えませんので注意してください。既に配列の中に入っている要素をシャッフルするには、一端`ArrayList`に配列の中身を取り出す必要があるので注意しましょう。

## 数値をシャッフルする

`ArrayList`を使って、1から10が格納されたコレクションを作りシャッフルしてみます。

```java {lineNos="inline", name="ShuffleTest1.java"}
import java.util.ArrayList;
import java.util.Collections;

public class ShuffleTest1 {

  public static void main(String[] args) {

    // ArrayListであるlistを宣言する
    ArrayList<Integer> list = new ArrayList<Integer>();

    // listに1～10を順番に格納し表示
    for (int i = 1; i <= 10; i++) {
      list.add(i);
    }
    System.out.println(list);

    // listをシャッフルし表示
    Collections.shuffle(list);
    System.out.println(list);

    // listをシャッフルし表示
    Collections.shuffle(list);
    System.out.println(list);
  }
}
```

実行結果の一例が以下になります。

```plaintext {lineNos="inline", name="出力結果（一例）"}
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[6, 2, 10, 7, 8, 5, 9, 3, 1, 4]
[6, 3, 8, 1, 9, 5, 10, 2, 7, 4]
```

1～10の数字がシャッフルされていることが分かります。

## 文字列をシャッフルする

先ほどは数値型のリストをシャッフルしてみました。今度は文字列の配列をシャッフルしてみます。

```java {lineNos="inline", name="ShuffleTest2.java"}
import java.util.ArrayList;
import java.util.Collections;

public class ShuffleTest2 {

  public static void main(String[] args) {

    // listにone,two,three,four,fiveの文字列を格納し表示
    ArrayList<String> list = new ArrayList<String>();
    list.add("one");
    list.add("two");
    list.add("three");
    list.add("four");
    list.add("five");
    System.out.println(list);

    // シャッフルしたlistを表示する
    Collections.shuffle(list);
    System.out.println(list);

    // シャッフルしたlistを表示する
    Collections.shuffle(list);
    System.out.println(list);
  }
}
```

実行結果の一例が以下になります。

```plaintext {lineNos="inline", name="出力結果（一例）"}
[one, two, three, four, five]
[one, two, three, five, four]
[three, two, five, four, one]
```

文字列の配列がシャッフルされていることが分かります。

## Randomクラスを指定してシャッフルする

次に、`Randomクラス`のオブジェクトを第2引数に指定してシャッフルしてみます。

```java {lineNos="inline", name="ShuffleTest3.java"}
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

public class ShuffleTest3 {
  public static void main(String[] args) {

    // listに1～10を順番に格納し表示
    ArrayList<Integer> list = new ArrayList<Integer>();
    for (int i = 1; i <= 10; i++) {
      list.add(i);
    }
    System.out.println(list);
    // Randomクラスのインスタンスを生成
    Random random = new Random(0);
    // listをシャッフルし表示
    Collections.shuffle(list, random);
    System.out.println(list);

    System.out.println();

    // listに1～10を順番に格納し表示
    ArrayList<Integer> list2 = new ArrayList<Integer>();
    for (int i = 1; i <= 10; i++) {
      list2.add(i);
    }
    System.out.println(list2);
    // Randomクラスのインスタンスを生成
    Random random2 = new Random(0);
    // listをシャッフルし表示
    Collections.shuffle(list2, random2);
    System.out.println(list2);
  }
}
```

実行結果の一例が以下になります。

```plaintext {lineNos="inline", name="出力結果（一例）"}
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[5, 9, 10, 7, 4, 6, 3, 2, 8, 1]

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[5, 9, 10, 7, 4, 6, 3, 2, 8, 1]
```

`Randomクラス`のインスタンス生成時に、引数に同じ数字を指定する（乱数を生成するのに使うseed値を同じにする）とシャッフルの結果も同じになることが分かります。

* * *

`shuffleメソッド`の使い方でした。以上で記事を終わりにします。

## 参考文献

* [Collections (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/util/Collections.html)

* [Random (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/util/Random.html)