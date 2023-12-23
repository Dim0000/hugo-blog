---
title: 【Java】Randomクラスで乱数を生成する方法【数値・真理値】
description: JavaのRandomクラスで乱数を生成する方法を紹介します。Randomクラスで数値（整数・小数）と真理値について乱数を生成してみます。
date: 2021-07-31
lastmod: 2023-11-04
categories:
  - 技術記事
tags: 
  - Java
archives: 
  - 2021/07
thumbnail: /images/java.png
# draft: false
---

Javaの`Randomクラス`で**乱数を生成する**方法を紹介します。`Randomクラス`で数値（整数・小数）と真理値について乱数を生成してみます。

## Randomクラスのインスタンス生成

`Randomクラス`は乱数を生成するためのクラスです。

{{< code lang="java" title="Randomクラスのインスタンス生成" >}}
Random random = new Random();
Random random = new Random(数値);

// Random random = new Random(10); と同じ
Random random = new Random();
random.setSeed(10);
{{< /code >}}

コンストラクタの引数に数値を指定することで、その数値をseedとして乱数を生成することができます。これは`setSeedメソッド`でseedを指定した場合と同じ意味を持ちます。

## int型の乱数を生成する

`int型`の乱数を生成したい時には`nextInt()メソッド`が便利です。

{{< code lang="java" title="nextIntメソッドの書式例" >}}
Random random = new Random();
random.nextInt(整数); // 0から"整数-1"以下の範囲で乱数を生成する
random.nextInt(); // int型の範囲で乱数を生成する
{{< /code >}}

0も範囲に入るので注意しましょう。0を入れたくない時は、戻り値を+1することで1以上の数値を生成できます。また、数字を入れなかった場合は`int型`が取り得る範囲での乱数を取得します。

{{< code lang="java" title="サンプルコード" >}}
import java.util.Random;

public class RandomTest_1 {

  public static void main(String[] args) {

    Random random = new Random();

    // 0から9の範囲で整数が生成される
    int num = random.nextInt(10);
    System.out.println("0から9の範囲:" + num);

    // 1から100の範囲で整数が生成される
    num = random.nextInt(100) + 1;
    System.out.println("1から100の範囲:" + num);

    // int型が取り得る範囲での乱数を取得
    num = random.nextInt();
    System.out.println("int型の範囲:" + num);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
0から9の範囲:0
1から100の範囲:38
int型の範囲:-1021826723
{{< /code >}}

## double型の乱数を生成する

`double型`の乱数を生成したい時は`nextDoubleメソッド`が便利です。

{{< code lang="java" title="nextDoubleメソッドの書式例" >}}
Random random = new Random();
random.nextDouble(); // 0から1.0未満の範囲で乱数を生成する

Math.random(); // 同じく、0から1.0未満の範囲で乱数を生成する
{{< /code >}}

また、`Mathクラス`の`randomメソッド`も同じ機能を持ちます。

{{< code lang="java" title="サンプルコード" >}}
import java.util.Random;

public class RandomTest_2 {

  public static void main(String[] args) {

    Random random = new Random();

    // 0から1.0未満の範囲で乱数を生成される
    double num = random.nextDouble();
    System.out.println("0から1.0未満の範囲（Randomクラス）:" + num);

    // Mathクラスのrandomメソッドの場合
    num = Math.random();
    System.out.println("0から1.0未満の範囲（Mathクラス）:" + num);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
0から1.0未満の範囲（Randomクラス）:0.2127723545518896
0から1.0未満の範囲（Mathクラス）:0.3652517356882634
{{< /code >}}

## boolean型の乱数を生成する

`boolean型`の乱数を生成したい時は`nextBoolean()メソッド`が便利です。

{{< code lang="java" title="nextBooleanメソッドの書式例" >}}
Random random = new Random();
random.nextBoolean(); // trueかfalseを生成する
{{< /code >}}

{{< code lang="java" title="サンプルコード" >}}
import java.util.Random;

public class RandomTest_3 {
  public static void main(String[] args) {

    Random random = new Random();

    // trueまたはfalseを生成する
    boolean b = random.nextBoolean();
    System.out.println("boolean型の乱数:" + b);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
boolean型の乱数:true
{{< /code >}}

* * *

`int型`・`double型`・`boolean型`の3種類の乱数の生成方法について紹介しました。以上で記事を終わりにします。

## 参考文献

* [Random (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/util/Random.html)

* [Math (Java Platform SE 8 )| Math](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Math.html)