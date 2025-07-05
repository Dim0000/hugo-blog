---
title: 【Java】sqrtメソッドで平方根（ルート√）を求める方法
description: Javaで平方根を求めるにはMathクラスのsqrtメソッドが便利です。今回はメソッドの使い方と、メソッドを使わず平方根を求める方法を紹介しています。
date: 2023-02-11
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2023/02
thumbnail: /images/java.webp
mathjax: true
---

Javaで**平方根**を求めるには`Mathクラス`の`sqrtメソッド`が便利です。今回はメソッドの使い方と、メソッドを使わず平方根を求める方法を紹介しています。

<!--more-->

ここで、平方根とは数 \\(a\\) があるとき、2乗して \\(a\\) になるような数のことを指します。つまり \\(x^{2}=a\\) を満たす数 \\(x\\) が \\(a\\) の平方根になります。

## sqrtメソッドの書式

メソッドの書式は以下になります。

{{< code lang="java" title="sqrtメソッドの書式" >}}
Math.sqrt(double a);
Math.sqrt(4); // 2が返る
{{< /code >}}

引数の平方根が返ってきます。戻り値の型は`double型`になります。

正の無限大の時は正の無限大がそのまま返されます。また、引数が負の数値である場合は`NaN`（Not a Number/非数）を返します（`NaN`が引数の時も同様です）。

似た機能を持つメソッドに、立方根を計算する`cbrtメソッド`があるので注意しましょう。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-cbrt-method" >}}</li>
</ul>
{{< /box >}}

## メソッドの使用例

メソッドの使用例をサンプルコードで示します。

{{< code lang="Java" title="SqrtTest1.java" >}}
public class SqrtTest1 {
  public static void main(String[] args) {
    System.out.println("4の平方根:" + Math.sqrt(4));
    System.out.println("9.0の平方根:" + Math.sqrt(9.0));
    System.out.println("10の平方根:" + Math.sqrt(10));
    System.out.println("-1の平方根:" + Math.sqrt(-1));
    System.out.println("0の平方根:" + Math.sqrt(0));
    System.out.println("正の無限大の平方根:" + Math.sqrt(Double.POSITIVE_INFINITY));
    System.out.println("NaNの平方根:" + Math.sqrt(Double.NaN));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
4の平方根:2.0
9.0の平方根:3.0
10の平方根:3.1622776601683795
-1の平方根:NaN
0の平方根:0.0
正の無限大の平方根:Infinity
NaNの平方根:NaN
{{< /code >}}

それぞれの数字の平方根が、`double型`で出力されていることが分かります。

## sqrtメソッドを使わずに平方根を計算する

`sqrtメソッド`を使わない方法として、数 \\(x\\) の平方根を求めたい時、 \\(0\\) から \\(x\\) までの平均を近似していくことで平方根を求める方法があります。この手法は二分法と呼ばれており、アルゴリズムの概要は以下のようになります。

{{< box "アルゴリズム" >}}
<ol>
<li>変数 \(\text{num1}=0\) 、 \(\text{num2}=x\) とし、 \(\text{num1}\) と \(\text{num2}\) の平均 \(\text{mid}\) を求める</li>
<li> \(\text{mid}^{2}=x\) の時、処理を終了する</li>
<li> \(\text{mid}^{2} < x\) だったら \(\text{num2}=\text{mid}\) とする</li>
<li> \(x < \text{mid}^{2}\) のとき、 \(\text{num1}=\text{mid}\) とする</li>
<li> \(\text{mid}^{2}=x\) か、ループの規定回数に達するまで1、2を繰り返す</li>
</ol>
{{< /box >}}

例として、10の平方根を求めるサンプルコードを以下に示します。近似の回数は最大1000回にしています。また、`double型`は誤差が発生するので、アルゴリズム2.の比較時は差がある程度の数値を下回るかどうかで判定します。

{{< code lang="java" title="SqrtTest2.java" >}}
public class SqrtTest2 {
  public static void main(String[] args) {
    double x = 10;
    double num1 = 0;
    double num2 = x;
    double mid;

    for (int i = 0; i < 1000; i++) {
      mid = (num2 + num1) / 2;
      if (Math.abs(mid * mid - x) < 0.00000000000001) {
        System.out.println(x + "の平方根:" + mid);
        break;
      } else if (mid * mid < x) {
        num1 = mid;
      } else if (x < mid * mid) {
        num2 = mid;
      }
    }
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
10.0の平方根:3.16227766016838
{{< /code >}}

先ほどの出力結果とほぼ数値が出力されたことが分かります。平方根が無理数の場合、繰り返し処理は最大まで達して処理を終了します。

* * *

ここまで色々と書きましたが、この方法だとコードが長いので普通に`sqrtメソッド`を使った方がコードが見やすく便利であることが分かります。以上で記事を終わりにします。

## 参考文献

* [Math (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/Math.html)

* [二分法の意味と平方根を計算する例 | 具体例で学ぶ数学](https://mathwords.net/nibunho)