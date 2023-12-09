---
title: 【Java】小数点の切り上げ・切り捨て・四捨五入をするメソッド
description: double型などの変数で小数点以下を丸めて整数にする時は、Mathクラスのceil・floor・roundメソッドを使います。それぞれのメソッドの処理についてまとめていきます。
date: 2022-08-04
lastmod: 2023-10-29
categories: 
  - IT知識
tags: 
  - Java
archives: 
  - 2022/08
thumbnail: /images/java.png
# draft: false
---

`double型`などの変数で小数点以下を丸めて整数にする時は、`Mathクラス`の`ceil`・`floor`・`roundメソッド`を使います。それぞれのメソッドの処理についてまとめていきます。

## それぞれのメソッドの処理

それぞれのメソッドの機能について紹介します。

### ceilメソッド:切り上げ

`ceilメソッド`は小数の**切り上げ**（対象の数値以上の中で最も小さい整数値を返す）を行います。戻り値は`double型`で返されます。

{{< code lang="java" title="ceilメソッドの書式例" >}}
Math.ceil(1.5);// 2.0が返ってくる
{{< /code >}}

引数が`NaN`、無限大、正または負の0、の場合は、引数と同じ値が返されます。

### floorメソッド:切り捨て

`floorメソッド`は小数の**切り捨て**（対象の数値以下の中で最も大きい整数値を返す）を行います。戻り値は`double型`で返されます。

{{< code lang="java" title="floorメソッドの書式例" >}}
Math.floor(1.5);// 1.0が返ってくる
{{< /code >}}

引数が`NaN`、無限大、正または負の0、の場合は、引数と同じ値が返されます。

### roundメソッド:四捨五入

`roundメソッド`は小数を**小数第1位で四捨五入**します。戻り値は`int`・`long型`で返されます。`double型`の場合は`long型`で、`float型`の場合は`int型`の返り値になります。上2つのメソッドとは返り値の型が異なるので注意しましょう。

{{< code lang="java" title="roundメソッドの書式例" >}}
Math.round(1.5);// 2が返ってくる
{{< /code >}}
引数が`NaN`の場合は0が返されます。

## メソッドの使用例

それぞれのメソッドの使用例をサンプルコードで示します。小数第2位以下で四捨五入を行いたい時は、一度桁上げを行ってから四捨五入し、その後桁下げをする必要があります。

{{< code lang="java" title="サンプルコード" >}}
public class RealNumTest {
  public static void main(String[] args) {
    double d1 = 0.5;
    double d2 = 2.5;
    double d3 = 2.4;
    double d4 = 1.15;

    // 小数点以下を切り上げする
    System.out.println(d1 + "の切り上げ:" + Math.ceil(d1));
    System.out.println(-d1 + "の切り上げ:" + Math.ceil(-d1));

    // 小数以下を切り捨てする
    System.out.println(d1 + "の切り上げ:" + Math.floor(d1));
    System.out.println(-d1 + "の切り捨て:" + Math.floor(-d1));

    // 小数第1位で四捨五入する
    System.out.println(d2 + "の四捨五入:" + Math.round(d2));
    System.out.println(-d2 + "の四捨五入:" + Math.round(-d2));
    System.out.println(d3 + "の四捨五入:" + Math.round(d3));
    System.out.println(-d3 + "の四捨五入:" + Math.round(-d3));

    // 小数第2位で四捨五入する
    System.out.println(d4 + "の四捨五入(小数第2位):" + ((double) Math.round(d4 * 10)) / 10);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
0.5の切り上げ:1.0
-0.5の切り上げ:-0.0
0.5の切り上げ:0.0
-0.5の切り捨て:-1.0
2.5の四捨五入:3
-2.5の四捨五入:-2
2.4の四捨五入:2
-2.4の四捨五入:-2
1.15の四捨五入(小数第2位):1.2
{{< /code >}}
* * *

切り捨て・切り上げの覚え方ですが、ceilは「天井」という意味なので切り上げ、floorは「床」という意味なので切り捨てという風に覚えましょう。

以上で記事を終わりにします。

## 参考文献

* [Math (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Math.html)