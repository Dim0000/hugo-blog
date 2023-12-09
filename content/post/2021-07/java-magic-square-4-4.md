---
title: 【Java】ランダムな4×4の魔方陣をプログラミングで作ってみる
description: 今回は、Javaを使って4行4列の16マス魔方陣（1～16の数字を1つずつ使ったもの）をランダムで生成するコードを作成してみたいと思います。
date: 2021-07-22
lastmod: 2023-11-04
categories: 
  - IT制作物
tags: 
  - Java
archives: 
  - 2021/07
thumbnail: /images/java.png
# draft: false
mathjax: true
---

皆さんは**魔方陣**と言われるものをご存知でしょうか？今回は、Javaを使って**4行4列の16マス魔方陣**（1～16の数字を1つずつ使ったもの）をランダムで生成するコードを作成してみたいと思います。

## 魔方陣の概要
魔方陣とは、以下のような**縦・横・斜めの全ての列について、合計が同じ数になる数字の表**のことをいいます。今回は1～16の数字を一つずつ使ったものを作っていきます。下に魔方陣の一例を示します。
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
『[４次魔方陣を求めるプログラム | 大同大学](https://www.daido-it.ac.jp/~oishi/TH5/ms4/ms4prg.html)』にある情報を参考にして、Javaで実装してみます。

{{< code lang="java" title="サンプルコード" >}}
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** 4×4の魔方陣を生成するクラス */
public class MakeMagicSquare44 {

  /** 1から16までを格納するArrayList */
  List<Integer> list = new ArrayList<Integer>();

  /** 完成した魔方陣の数表を格納する配列 */
  int array[] = new int[16];

  /** 実行用mainメソッド */
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

## ArrayListのシャッフルで強引に求める
おまけで、ゴリ押しで魔方陣を作成してみます。具体的なアルゴリズムについては以下になります。

{{< box "アルゴリズム" >}}
<ol>
<li>1~16までの数字が格納された<code>ArrayList</code>をシャッフルする</li>
<li><code>ArrayList</code>を4×4の数表と見立てて、横の4列の合計値が34か1列ずつチェックする
<ul><li>合計値が34以外ならその列をシャッフルしてチェックを繰り返す</li></ul>
</li>
<li>縦の4列と斜めの2列の合計値が全て34かチェックする
<ul><li>合計値が34以外の列があるなら1に戻る</li></ul>
</li>
<li>数表として出力する</li>
</ol>
{{< /box >}}

実際に、上のアルゴリズムをJavaで実装してみましょう。最終的に何回シャッフルするかを確認する変数も入れてあります。

{{< code lang="java" title="サンプルコード" >}}
import java.util.ArrayList;
import java.util.Collections;

public class MakeMagicSquare44 {

  // 魔方陣となる数字を格納するArrayList
  ArrayList<Integer> OriginalList = new ArrayList<Integer>();

  // 合計値チェック用のArrayList
  ArrayList<Integer> checkList = new ArrayList<Integer>();

  // シャッフル回数カウント用の変数
  int count = 0;

  public static void main(String[] args) {
    MakeMagicSquare44 mMagicSquare = new MakeMagicSquare44();
    mMagicSquare.generateList();
    mMagicSquare.checkMagicSquare();
    mMagicSquare.showMagicSquare();
  }

  // ArrayListに1～16を格納しシャッフルする
  private void generateList() {
    for (int i = 1; i <= 16; i++) {
      OriginalList.add(i);
    }
    Collections.shuffle(OriginalList);
  }

  // ArrayListを数表として出力する
  private void showMagicSquare() {
    int num = 0;
    for (int i = 0; i < 4; i++) {
      for (int j = 0; j < 4; j++) {
        System.out.printf("%3d", OriginalList.get(num++));
      }
      System.out.println();
    }
    System.out.println("シャッフル回数:" + count);
  }

  // 魔方陣かどうかチェックする
  private void checkMagicSquare() {
    while (true) {
      checkRowMagicSquare();
      if (checkColumnMagicSquare() && checkDiagonalRowMagicSquare()) {
        break;
      } else {
        Collections.shuffle(OriginalList);
        count++;
      }
    }
  }

  // 横の4列の合計値が34か判定
  private void checkRowMagicSquare() {
    checkList.addAll(OriginalList);
    OriginalList.clear();
    int checkCount = 0;
    while (checkCount < 4) {
      if (sumCheck(checkList.get(0), checkList.get(1), checkList.get(2), checkList.get(3))) {
        for (int i = 0; i < 4; i++) {
          OriginalList.add(checkList.get(0));
          checkList.remove(0);
        }
        checkCount++;
      } else {
        Collections.shuffle(checkList);
        count++;
      }
    }
  }

  // 縦の4列の合計値が34か判定
  private boolean checkColumnMagicSquare() {
    return sumCheck(OriginalList.get(0), OriginalList.get(4), OriginalList.get(8), OriginalList.get(12))
        && sumCheck(OriginalList.get(1), OriginalList.get(5), OriginalList.get(9), OriginalList.get(13))
        && sumCheck(OriginalList.get(2), OriginalList.get(6), OriginalList.get(10), OriginalList.get(14))
        && sumCheck(OriginalList.get(3), OriginalList.get(7), OriginalList.get(11), OriginalList.get(15));
  }

  // 斜めの2列の合計値が34か判定
  private boolean checkDiagonalRowMagicSquare() {
    return sumCheck(OriginalList.get(0), OriginalList.get(5), OriginalList.get(10), OriginalList.get(15))
        && sumCheck(OriginalList.get(3), OriginalList.get(6), OriginalList.get(9), OriginalList.get(12));
  }

  // 引数の合計値が34か判定
  private boolean sumCheck(int num1, int num2, int num3, int num4) {
    return (num1 + num2 + num3 + num4 == 34);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
  1 12  7 14
 15  6  9  4
 10  3 16  5
  8 13  2 11
シャッフル回数:28385946
{{< /code >}}
これで4×4の魔方陣の完成です。解が見つかるまでループするため、シャッフル回数は28385946回と多いですね。もっと少ない計算で生成するやり方もありそうですね。  

以上で記事を終わりにします。