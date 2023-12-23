---
title: 【Java】数独に使われる魔方陣をプログラミングで作る
description: 今回は数独に使われる9×9の魔方陣をランダムに出力するプログラムを作成してみます。
date: 2021-10-06
lastmod: 2023-11-02
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2021/10
thumbnail: /images/java.png
# draft: false
---

今回は数独に使われる9×9の魔方陣をランダムに出力するプログラムを作成してみます。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-magic-square-4-4" >}}</li>
</ul>
{{< /box >}}

## 数独魔方陣の特徴

作成する数独の9×9の魔方陣の特徴についてまとめます。

{{< box "数独の魔方陣の特徴" >}}
<ul>
<li>縦と横の全ての列で1~9の数字が1つずつ使われる</li>
<li>3×3のブロックに1~9の数字が1つずつ使われる</li>
</ul>
{{< /box >}}

数独の魔方陣はこんな感じの数表です。

$$
\large\begin{array}{|c|c|c|c|c|c|c|c|c|}
  \hline
  7 & 2 & 9 & 3 & 6 & 4 & 1 & 5 & 8 \\\\
  \hline
  6 & 1 & 5 & 9 & 2 & 8 & 3 & 7 & 4 \\\\
  \hline
  3 & 4 & 8 & 7 & 1 & 5 & 6 & 2 & 9 \\\\
  \hline
  4 & 9 & 3 & 2 & 8 & 1 & 7 & 6 & 5 \\\\
  \hline
  8 & 6 & 1 & 5 & 9 & 7 & 4 & 3 & 2 \\\\
  \hline
  2 & 5 & 7 & 4 & 3 & 6 & 9 & 8 & 1 \\\\
  \hline
  1 & 7 & 2 & 8 & 4 & 3 & 5 & 9 & 6 \\\\
  \hline
  9 & 3 & 6 & 1 & 5 & 2 & 8 & 4 & 7 \\\\
  \hline
  5 & 8 & 4 & 6 & 7 & 9 & 2 & 1 & 3 \\\\
  \hline
\end{array}
$$

## プログラミングで作ってみる

上の画像のような数表をランダムで出力するプログラムを作成します。

基本的な作り方のアルゴリズムは以下の通りです。重複のチェックはHashSetを使いました。

{{< box "アルゴリズム" >}}
<ol>
<li>出来上がった数表を格納する配列<code>array</code>を宣言する</li>
<li>1~9の数字が入った<code>ArrayList</code>を作りシャッフルし、<code>array</code>に格納する（これが横の行の1つになる）</li>
<li>縦の列に重複しないように<code>ArrayList</code>を<code>array</code>に格納していく　重複したら格納せずもう一度シャッフルしていくを繰り返す</li>
<li>同時に3×3のブロックも重複がないかチェックする　重複したらその都度やり直す</li>
</ol>
{{< /box >}}

サンプルコードを以下に示します。

{{< code lang="java" title="サンプルコード" >}}
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MakeSudoku {
  /** 数独の数字を格納する配列 */
  int[][] array = new int[9][9];

  /** 1から9までを格納するArrayList */
  List<Integer> list = new ArrayList<Integer>();

  /** 重複チェック用のhashSet1 */
  Set<Integer> hashSet1 = new HashSet<>();

  /** 重複チェック用のhashSet2 */
  Set<Integer> hashSet2 = new HashSet<>();

  /** 実行用mainメソッド */
  public static void main(String[] args) {
    MakeSudoku makeSudoku = new MakeSudoku();
    makeSudoku.execute();
    makeSudoku.showArray();
  }

  /** 数独の作成 */
  private void execute() {
    for (int i = 1; i <= 9; i++) {
      list.add(i);
    }
    Collections.shuffle(list);

    for (int i = 0, j; i <= 8;) {
      int u = 2, v = 2;
      if (i == 5) {
        u = 5;
      }

      for (j = 0; j <= 8;) {
        array[i][j] = list.get(j);
        for (int x = 0; x < i; x++) {
          hashSet1.add(array[x][j]);
        }
        if (hashSet1.contains(array[i][j])) {
          hashSet1.clear();
          break;
        }
        if (i == u && j == v) {
          hashSet2.add(array[u - 2][v - 2]);
          hashSet2.add(array[u - 2][v - 1]);
          hashSet2.add(array[u - 2][v]);
          hashSet2.add(array[u - 1][v - 2]);
          hashSet2.add(array[u - 1][v - 1]);
          hashSet2.add(array[u - 1][v]);
          hashSet2.add(array[u][v - 2]);
          hashSet2.add(array[u][v - 1]);
          hashSet2.add(array[u][v]);
          if (hashSet2.size() != 9) {
            hashSet2.clear();
            i -= 2;
            j = 0;
            break;
          }
          v = 5;

        }
        j++;

        hashSet1.clear();
        hashSet2.clear();
      }
      if (j == 9) {
        i++;
      }

      Collections.shuffle(list);
    }
  }

  /** 配列を数表形式で出力する */
  private void showArray() {
    for (int[] a : array) {
      for (int i : a) {
        System.out.printf("%3d", i);
      }
      System.out.println();
    }
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
  7  3  2  1  4  9  5  6  8
  5  1  6  3  8  2  9  7  4
  8  4  9  7  6  5  3  2  1
  4  2  5  6  9  8  1  3  7
  6  9  3  4  1  7  8  5  2
  1  7  8  5  2  3  4  9  6
  2  8  7  9  5  4  6  1  3
  9  6  4  2  3  1  7  8  5
  3  5  1  8  7  6  2  4  9
{{< /code >}}

条件を満たす数表が出力されました。条件を満たすまでシャッフルを繰り返すので、出力されるまでちょっと時間がかかります。

* * *

今回は数独の数表を作るところまで完成しました。

完全にランダムで条件を満たすか当てはめていってるので、処理に時間がかかっているところが問題点ですね。その部分を処理を減らすことも考えていきたいです。

この記事では時間がなくてできませんでしたが、数独の問題を作る機能も実装したいと思います。以上で記事を終わりにします。