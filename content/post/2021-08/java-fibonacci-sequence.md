---
title: 【Java】フィボナッチ数列をプログラミングで表現してみる【JavaScript】
description: 今回はJavaとJavaScriptを使って、数学的に有名な数列であるフィボナッチ数列をプログラミングで作りたいと思います。また、フィボナッチ数列と黄金比との比較もプログラミングで行ってみます。
date: 2021-08-07
categories: 
  - 技術記事
tags: 
  - Java
  - JavaScript
archives: 
  - 2021/08
thumbnail: /images/java.webp
mathjax: true
---

今回はJavaとJavaScriptを使って、数学的に有名な数列である**フィボナッチ数列**をプログラミングで作りたいと思います。また、フィボナッチ数列と黄金比との比較もプログラミングで行ってみます。

<!--more-->

## フィボナッチ数列とは

**フィボナッチ数列**は以下のような数列のことを指します。

$$ 0,1,1,2,3,5,8,13,21,34,\ldots $$

この数列 \\(F_{n}\\\) は、1番目を \\(F_{0}=0\\) 、2番目を \\(F_{1}=1\\) として、それ以降は1つ前と2つ前の数字を足した数字

$$ F_{n+2}=F_{n}+F_{n+1}\ \small(n\ge0) $$

になります。

ここで、フィボナッチ数列の隣同士の数字の比は、数列の項が後ろになればなるほど黄金比と呼ばれる \\(1\colon\frac{1+\sqrt{5}}{2}\\) に近似されるという特徴があります。

## Javaでフィボナッチ数列を出力する

では、配列とfor文を使ってフィボナッチ数列を10番目まで出力させてみましょう。今回、配列を出力させるのに`Arraysクラス`の`toStringメソッド`を使っています。

フィボナッチ数列の比と黄金比との差も求めてみましょう。`sqrtメソッド`を使って黄金比を出し、指定した数列の項の比との差を求めます。メソッドについては以下の記事にまとめています。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-sqrt-method" >}}</li>
</ul>
{{< /box >}}

{{< code lang="java" title="FibonacciSequence.java" >}}
import java.util.Arrays;

public class FibonacciSequence {

  /** フィボナッチ数列を格納する配列 */
  private long[] array;

  /** 黄金比 */
  private static final double gold = (1 + Math.sqrt(5)) / 2;

  /** フィボナッチ数列の比と黄金比との差 */
  private double difference;

  /** 実行用mainメソッド */
  public static void main(String[] args) {
    FibonacciSequence fSequence = new FibonacciSequence();
    fSequence.getFibonacciSequence(5);
    System.out.println(Arrays.toString(fSequence.array));
    System.out.println("黄金比との差:" + fSequence.difference);
    fSequence.getFibonacciSequence(10);
    System.out.println(Arrays.toString(fSequence.array));
    System.out.println("黄金比との差:" + fSequence.difference);
  }

  /**
   * フィボナッチ数列と黄金比との差を取得
   * 
   * @param num 出力する数列の長さ
   */
  private void getFibonacciSequence(int num) {
    if (num < 3) {
      num = 2;
    }
    array = new long[num];
    // 配列の1番目と2番目に0と1を格納する
    array[0] = 0;
    array[1] = 1;
    // 3番目以降に1つ前と2つ前の数字を足した数字を入れる
    for (int i = 2; i < num; i++) {
      array[i] = array[i - 1] + array[i - 2];
    }
    difference = gold - ((double) array[num - 1] / (double) array[num - 2]);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
[0, 1, 1, 2, 3]
黄金比との差:0.1180339887498949
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
黄金比との差:-0.0010136302977241662
{{< /code >}}

プログラム上でも、先ほど説明した数列と同じものが出力されたことがわかります。今回は比較のため引数は「5」、「10」の2回出力結果を出しました。出力結果を見ると、数字が大きい程、黄金比との差が小さくなることがわかります。

## JavaScriptでフィボナッチ数列を出力する

`JavaScript`で書いた場合だと以下の様になります。あまり違いはありませんね。

{{< code lang="javascript" title="fibonacciSequence.js" >}}
function fibonacciSequence(num) {
  let array = new Array(num);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i < num; i++) {
  array[i] = array[i - 1] + array[i - 2];
  }
  const gold = (1 + Math.sqrt(5)) / 2
  const difference = gold - array[num - 1] / array[num - 2];
}
{{< /code >}}

入力した数値の長さのフィボナッチ数列と黄金比との差を返すツールのようなものを作成してみました。入力可能数値は最大50となっており、それ以上の数値を入力した場合でも50として計算させています。

{{< box "計算ツール" >}}
<script type="text/javascript">
  function onButtonClick() {
    fibonacciSequence (document.getElementById("num").value);
  }

  function fibonacciSequence(num) {
    if(num > 50){
      num = 50;
    }
    if (num < 3) {
      num = 2;
    }
    let array = new Array(num);
    array[0] = 0;
    array[1] = 1;
    for (let i = 2; i < num; i++) {
      array[i] = array[i - 1] + array[i - 2];
    }
    const gold = (1 + Math.sqrt(5)) / 2
    const difference = gold - array[num - 1] / array[num - 2];
    const elem1 = document.getElementById("array");
    const elem2 = document.getElementById("difference");
    elem1.innerText = array.join(', ');
    elem2.innerText = difference;
  }
</script>
<p>数列の長さを入力（最大50まで）:<input id="num" type="number" max="50" />
<button onclick="onButtonClick()">計算処理実行</button></p>
<p><nobr>数列:</nobr><span id="array"></span></p>
<p>黄金比との差:<span id="difference"></span></p>
{{< /box >}}

実行結果はJavaのものと同じになることも分かります。

* * *

今回はJavaとJavaScriptでフィボナッチ数列を出力してみました。

フィボナッチ数列は自然界にも現れることの多い不思議な数列です。「花びらの枚数」だったり「気管支の枝分かれ」にもフィボナッチ数列と関わりがあるようです。

プログラミングでフィボナッチ数列を表現する問題は、プログラミング初級者向けに良く見られるのでまとめてみました。以上で記事を終わりにします。

## 参考文献

* [フィボナッチ数 | Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%9C%E3%83%8A%E3%83%83%E3%83%81%E6%95%B0)