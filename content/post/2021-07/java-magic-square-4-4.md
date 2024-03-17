---
title: 【Java】ランダムな4×4の魔方陣をプログラミングで作ってみる
description: 今回は、Javaを使って4行4列の16マスの魔方陣（1～16の数字を1つずつ使ったもの）をランダムで生成するコードを作成してみたいと思います。
date: 2021-07-22
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2021/07
thumbnail: /images/java.webp
mathjax: true
---

今回は、**Java**を使って4行4列の16マスの**魔方陣**（1～16の数字を1つずつ使ったもの）をランダムで生成するコードを作成してみたいと思います。

<!--more-->

## 魔方陣の概要

皆さんは「魔方陣」と言われるものをご存知でしょうか？魔方陣とは、以下のような**縦・横・斜めの全ての列の合計が同じになる数表**のことをいいます。今回は1～16の数字を一つずつ使ったものを作っていきます。下に魔方陣の一例を示します。

$$
\large\begin{array}{|c|c|c|c|}
  \hline
  1 & 14 & 15 & 4 \\\\
  \hline
  8 & 11 & 10 & 5 \\\\
  \hline
  12 & 7 & 6 & 9 \\\\
  \hline
  13 & 2 & 3 & 16 \\\\
  \hline
\end{array}
$$

画像の魔方陣では、縦・横・斜めのどの列も合計が**34**になっていることが分かります。この性質を利用して、段階を踏みながらこのような表を出力してみます。

## 魔方陣の性質を利用して生成してみる

『[４次魔方陣を求めるプログラム | 大同大学](https://www.daido-it.ac.jp/~oishi/TH5/ms4/ms4prg.html)』にあるアルゴリズムを参考にして、Javaで実装してみます。

{{< code lang="java" title="MakeMagicSquare44.java" >}}
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MakeMagicSquare44 {

  /** 1から16までを格納するArrayList */
  List<Integer> list = new ArrayList<Integer>();

  /** 完成した魔方陣の数表を格納する配列 */
  int array[] = new int[16];

  public static void main(String[] args) {
    MakeMagicSquare44 mMagicSquare = new MakeMagicSquare44();
    mMagicSquare.execute();
    mMagicSquare.showArray();
  }

  /** 魔方陣の作成 */
  private void execute() {
    while (true) {
      generateList();
      array[0] = list.get(0);
      list.remove(0);
      array[3] = list.get(0);
      list.remove(0);
      if (!getTwoCombination(0, 3, 12, 15)) {
        continue;
      }
      if (!getTwoCombination(0, 15, 5, 10)) {
        continue;
      }
      if (!getTwoCombination(0, 3, 1, 2)) {
        continue;
      }
      if (!getTwoCombination(3, 12, 6, 9)) {
        continue;
      }
      if (!getLastOne(1, 5, 9, 13)) {
        continue;
      }
      if (!getLastOne(2, 6, 10, 14)) {
        continue;
      }
      if (!getTwoCombination(5, 6, 4, 7)) {
        continue;
      }
      if (!getLastOne(0, 4, 12, 8)) {
        continue;
      }
      if (!getLastOne(3, 7, 15, 11)) {
        continue;
      }
      break;
    }
  }

  /** listに1～16を格納しシャッフルする */
  private void generateList() {
    list.clear();
    for (int i = 1; i <= 16; i++) {
      list.add(i);
    }
    Collections.shuffle(list);
  }

  /** 数字が2つ埋まっている列に対して、残りを数字をlistから決定する */
  private boolean getTwoCombination(int index1, int index2, int index3, int index4) {
    for (int i = 0; i < list.size() - 1; i++) {
      for (int j = i + 1; j < list.size(); j++) {
        if (array[index1] + array[index2] + list.get(i) + list.get(j) == 34) {
          array[index3] = list.get(i);
          array[index4] = list.get(j);
          list.remove(list.indexOf(array[index3]));
          list.remove(list.indexOf(array[index4]));
          return true;
        }
      }
    }
    return false;
  }

  /** 数字が3つ埋まっている列に対して、残りを数字をlistから決定する */
  private boolean getLastOne(int index1, int index2, int index3, int index4) {
    for (int i = 0; i < list.size(); i++) {
      if (array[index1] + array[index2] + array[index3] + list.get(i) == 34) {
        array[index4] = list.get(i);
        list.remove(list.indexOf(list.get(i)));
        return true;
      }
    }
    return false;
  }

  /** 配列を数表形式で出力する */
  private void showArray() {
    for (int i = 0; i < 16; i++) {
      System.out.printf("%3d", array[i]);
      if ((i + 1) % 4 == 0) {
        System.out.println();
      }
    }
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
  8 13 11  2
  5 10 16  3
 12  7  1 14
  9  4  6 15
{{< /code >}}

魔方陣の性質を利用して順に数字を求めていくことで、比較的簡単に生成することができました。

* * *

今回は、Javaで16マス魔方陣を作成してみました。以上で記事を終わりにします。