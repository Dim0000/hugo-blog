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

「[４次魔方陣を求めるプログラム | 大同大学](https://www.daido-it.ac.jp/~oishi/TH5/ms4/ms4prg.html)」にあるアルゴリズムを参考にして、Javaで実装してみます。

```java {lineNos="inline", name="MakeMagicSquare44.java"}
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MakeMagicSquare44 {

    private static final int MAGIC_SUM = 34;
    private static final int SIZE = 16;
    private static final int DIM = 4;

    /** 1から16までを格納するArrayList */
    private List<Integer> list = new ArrayList<>();

    /** 完成した魔方陣の数表を格納する配列 */
    private int[] array = new int[SIZE];

    public static void main(String[] args) {
        MakeMagicSquare44 magicSquare = new MakeMagicSquare44();
        magicSquare.execute();
        magicSquare.showArray();
    }

    /** 魔方陣の作成 */
    private void execute() {
        while (true) {
            generateList();
            initializeCorners();
            if (attemptFillMagicSquare()) {
                break;
            }
        }
    }

    /** listに1～16を格納しシャッフルする */
    private void generateList() {
        list.clear();
        for (int i = 1; i <= SIZE; i++) {
            list.add(i);
        }
        Collections.shuffle(list);
    }

    /** 初期のコーナー要素を設定 */
    private void initializeCorners() {
        array[0] = list.remove(0);
        array[3] = list.remove(0);
    }

    /** 魔方陣を埋める試みを行う */
    private boolean attemptFillMagicSquare() {
        return checkCombinationAndFill(0, 3, 12, 15) &&
               checkCombinationAndFill(0, 15, 5, 10) &&
               checkCombinationAndFill(0, 3, 1, 2) &&
               checkCombinationAndFill(3, 12, 6, 9) &&
               fillLastOne(1, 5, 9, 13) &&
               fillLastOne(2, 6, 10, 14) &&
               checkCombinationAndFill(5, 6, 4, 7) &&
               fillLastOne(0, 4, 12, 8) &&
               fillLastOne(3, 7, 15, 11);
    }

    /** 2つの数字が埋まっている列に対して、残りの2つの数字をlistから決定する */
    private boolean checkCombinationAndFill(int index1, int index2, int index3, int index4) {
        for (int i = 0; i < list.size() - 1; i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (array[index1] + array[index2] + list.get(i) + list.get(j) == MAGIC_SUM) {
                    array[index3] = list.remove(i);
                    array[index4] = list.remove(j - 1);
                    return true;
                }
            }
        }
        return false;
    }

    /** 3つの数字が埋まっている列に対して、残りの1つの数字をlistから決定する */
    private boolean fillLastOne(int index1, int index2, int index3, int index4) {
        for (int i = 0; i < list.size(); i++) {
            if (array[index1] + array[index2] + array[index3] + list.get(i) == MAGIC_SUM) {
                array[index4] = list.remove(i);
                return true;
            }
        }
        return false;
    }

    /** 配列を数表形式で出力する */
    private void showArray() {
        for (int i = 0; i < SIZE; i++) {
            System.out.printf("%3d", array[i]);
            if ((i + 1) % DIM == 0) {
                System.out.println();
            }
        }
    }
}
```

```plaintext {lineNos="inline", name="出力結果（一例）"}
  8 13 11  2
  5 10 16  3
 12  7  1 14
  9  4  6 15
```

魔方陣の性質を利用して順に数字を求めていくことで、比較的簡単に生成することができました。

* * *

今回は、Javaで16マス魔方陣を作成してみました。以上で記事を終わりにします。