---
title: 【Java】ランダムなミニナンプレをプログラムで作ってみる
description: 今回はJavaを使って4×4のミニナンプレをランダムに生成するプログラムを書いてみます。
date: 2022-04-02
lastmod: 2023-11-02
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/04
thumbnail: /images/java.png
# draft: false
---

今回はJavaを使って4×4の**ミニナンプレ**をランダムに生成するプログラムを書いてみます。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-magic-square-4-4" >}}</li>
</ul>
{{< /box >}}

## ミニナンプレとは

ナンプレはロジックパズルとして有名で馴染み深いものとして知られています。今回作るミニナンプレはナンプレを簡略化したもので、1～4の数字を使った4×4のパズルになります。下に、問題と解答の一例を示します。

$$
\large\begin{array}{|c|c|c|c|}
  \hline
  1 &  &  &  \\\\
  \hline
  3 &  & 1 & 2 \\\\
  \hline
  4 & 3 &  & 1 \\\\
  \hline
   &  &  & 3 \\\\
  \hline
\end{array}
\to
\large\begin{array}{|c|c|c|c|}
  \hline
  1 & 2 & 3 & 4 \\\\
  \hline
  3 & 4 & 1 & 2 \\\\
  \hline
  4 & 3 & 2 & 1 \\\\
  \hline
  2 & 1 & 4 & 3 \\\\
  \hline
\end{array}
$$

縦と横の全ての列と中心で区切られた4マスのボックスに1～4の数字が全て入るように数字を当てはめます。

今回のプログラムを作成について、まず右側の完成した表から作っていき、そこから左側の問題となる表を求めたいと思います。

## 4×4のミニナンプレ表（完成表）を作成する

前回の記事で書いたプログラムを改変して使います。アルゴリズムとしては以下のような流れになります。

{{< box "アルゴリズム" >}}
<ul>
<li><code>ArrayList</code>に1～4の数字を格納し、<code>shuffleメソッド</code>でシャッフルしてから4×4の配列に4回分の<code>ArrayList</code>を格納して仮の表を作る</li>
<li>仮の表が条件に一致するまで、その都度シャッフルを繰り返す</li>
<li>条件に一致した仮表が出来たら完成表として出力する</li>
</ul>
{{< /box >}}

アルゴリズムの詳細な部分は前回と被るところが多いので割愛します。

前回の魔方陣の時と違うところは、「**全ての行・列・ボックスの合計が10である**」「**横の行については既にシャッフルによって完成しているので、縦の列とボックスのみ比較すれば良い**」の2点です。縦の行とボックスは`HashSet`を使って数字を格納し、`sizeメソッド`を使ってサイズが4である（1から4全て使ってる）かチェックしました。

なお、ボックスの比較については、縦横が揃っていてボックスの4つの内どれか一つっでも条件を満たしていれば他の3つも自動的に条件を満たすため、左上のみ判定しています。また、前回と同様シャッフル回数測定のために変数countを設置しています。

実際にできたコードが下になります。

{{< code lang="java" title="サンプルコード" >}}
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MakeMiniNumberPlace {
  /** 1から16までを格納するArrayList */
  List<Integer> list = new ArrayList<Integer>();

  /** 魔方陣の数字を格納する配列 */
  int[][] array = new int[4][4];

  /** 重複チェック用のhashSet */
  Set<Integer> hashSet = new HashSet<>();

  /** シャッフル回数カウント用の変数 */
  int count = 0;

  /** 実行用mainメソッド */
  public static void main(String[] args) {
    MakeMiniNumberPlace mMiniNumberPlace = new MakeMiniNumberPlace();
    mMiniNumberPlace.execute();
  }

  /** 魔方陣の作成 */
  private void execute() {
    generateList();

    label: while (true) {
      // 横の列を比較
      for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
          array[i][j] = list.get(j);
        }
        Collections.shuffle(list);
        count++;
      }

      // 縦の列を比較
      hashSet.clear();
      for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
          hashSet.add(array[j][i]);
        }
        if (hashSet.size() != 4) {
          continue label;
        }
        hashSet.clear();
      }

      // 縦の列はOKなのでボックスの中身を比較
      // 左上のボックスが条件を満たしていれば他のボックスも自動的にOK
      hashSet.add(array[0][0]);
      hashSet.add(array[0][1]);
      hashSet.add(array[1][0]);
      hashSet.add(array[1][1]);
      if (hashSet.size() == 4) {
        break;
      }
    }

    showArray();
  }

  /** listに1～4を格納しシャッフル */
  private void generateList() {
    list.clear();
    for (int i = 1; i <= 4; i++) {
      list.add(i);
    }
    Collections.shuffle(list);
  }

  /** 配列を数表形式で出力する */
  private void showArray() {
    for (int[] a : array) {
      for (int i : a) {
        System.out.printf("%3d", i);
      }
      System.out.println();
    }
    System.out.println("シャッフル回数:" + count);
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
  2  3  1  4
  4  1  3  2
  1  2  4  3
  3  4  2  1
シャッフル回数:10688
{{< /code >}}

完成表が出力されました。`count`は5000～10000になることが多かったですね。前回よりシャッフル回数も格段に少ないことが分かります。こちらの方が条件が緩いので、完成表を求めるのに試行回数が少なく済んでいます。

## ミニナンプレの問題を解くプログラム

次に、下の数表のように、ミニナンプレの空白の部分を0とした数列が与えられたとき、そこからミニナンプレを完成させるプログラムを完成させます。

{{< code lang="plaintext" title="" >}}
1 0 0 0      1 2 3 4
3 0 1 2   →  3 4 1 2
4 3 0 1      4 3 2 1
0 0 0 0      2 1 4 3
{{< /code >}}

実際にできたコードが下になります。

{{< code lang="java" title="サンプルコード" >}}
import java.util.HashSet;
import java.util.Set;

/** ミニナンプレを解くクラス */
public class CalcMiniNumberPlace {

  /** 魔方陣の問題を格納する配列 */
  int[][] probArray;

  /** 魔方陣の答えを格納する配列 */
  int[][] ansArray = new int[4][4];

  /** 重複チェック用のhashSet */
  Set<Integer> hashSet = new HashSet<>();

  /** 実行用mainメソッド */
  public static void main(String[] args) {
    CalcMiniNumberPlace cMiniNumberPlace = new CalcMiniNumberPlace();
    cMiniNumberPlace.probArray = new int[][] { { 1, 0, 0, 0 }, { 3, 0, 1, 2 }, { 4, 3, 0, 1 }, { 0, 0, 0, 0 } };
    cMiniNumberPlace.execute();
    cMiniNumberPlace.showArray();
  }

  /** ミニナンプレを解く */
  private void execute() {
    for (int i = 0; i < 4; i++) {
      for (int j = 0; j < 4; j++) {
        if (probArray[i][j] != 0) {
          ansArray[i][j] = probArray[i][j];
          continue;
        }
      }
    }
    int x = 1;
    while (x != 0) {
      x = 0;
      for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
          // 縦
          if (ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[i][0], ansArray[i][1], ansArray[i][2],
                ansArray[i][3]);
            x++;
          }
          // 横
          if (ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[0][j], ansArray[1][j], ansArray[2][j],
                ansArray[3][j]);
            x++;
          }
          // 斜め
          if (i == j && ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[0][0], ansArray[1][1], ansArray[2][2],
                ansArray[3][3]);
            x++;
          }
          if (i + j == 3 && ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[0][3], ansArray[1][2], ansArray[2][1],
                ansArray[3][0]);
            x++;
          }
          // ボックス
          if (i < 2 && j < 2 && ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[0][0], ansArray[0][1], ansArray[1][0],
                ansArray[1][1]);
            x++;
          }
          if (i < 2 && j > 1 && ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[0][2], ansArray[0][3], ansArray[1][2],
                ansArray[1][3]);
            x++;
          }
          if (i > 1 && j < 2 && ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[2][0], ansArray[2][1], ansArray[3][0],
                ansArray[3][1]);
            x++;
          }
          if (i > 1 && j > 1 && ansArray[i][j] == 0) {
            ansArray[i][j] = getLastOne(ansArray[2][2], ansArray[2][3], ansArray[3][2],
                ansArray[3][3]);
            x++;
          }
        }
      }
    }
  }

  /** 3個の数字から残りの1つを求めるメソッド */
  private int getLastOne(int num1, int num2, int num3, int num4) {
    hashSet.clear();
    hashSet.add(num1);
    hashSet.add(num2);
    hashSet.add(num3);
    hashSet.add(num4);
    if (hashSet.size() == 4) {
      return 10 - num1 - num2 - num3 - num4;
    }
    return 0;
  }

  /** 配列を数表形式で出力する */
  private void showArray() {
    for (int[] a : ansArray) {
      for (int i : a) {
        System.out.printf("%3d", i);
      }
      System.out.println();
    }
  }

}
{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
  1  2  3  4
  3  4  1  2
  4  3  2  1
  2  1  4  3
{{< /code >}}

## ミニナンプレの問題を作るプログラム

次は、今回得た表からどうやってミニナンプレを作るか検討していきます。完成表から10個穴を開けるやり方で実装してみます。


実際にできたコードが下になります。

{{< code lang="java" title="サンプルコード" >}}
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PunchMiniNumberPlace {

  /** 魔方陣の問題を格納する配列 */
  int[][] originalArray;

  /** 魔方陣の問題を格納する配列 */
  int[][] probArray;

  List<Integer> list = new ArrayList<Integer>();

  /** 実行用mainメソッド */
  public static void main(String[] args) {
    PunchMiniNumberPlace pMiniNumberPlace = new PunchMiniNumberPlace();
    pMiniNumberPlace.originalArray = new int[][] { { 1, 2, 3, 4 }, { 3, 4, 1, 2 }, { 4, 3, 2, 1 }, { 2, 1, 4, 3 } };
    pMiniNumberPlace.probArray = new int[4][4];
    pMiniNumberPlace.execute();
    pMiniNumberPlace.showArray();
  }

  /** ミニナンプレの問題を作る */
  private void execute() {
    // 0に置き換える箇所を決める
    for (int i = 0; i <= 15; i++) {
      list.add(i);
    }
    Collections.shuffle(list);

    for (int i = 0, x = 0; i < 4; i++) {
      for (int j = 0; j < 4; j++) {
        if (x == list.get(0) || x == list.get(1) || x == list.get(2) || x == list.get(3) || x == list.get(4)
            || x == list.get(5)) {
          probArray[i][j] = originalArray[i][j];
        } else {
          probArray[i][j] = 0;
        }
        x++;
      }
    }
  }

  /** 配列を数表形式で出力する */
  private void showArray() {
    for (int[] a : originalArray) {
      for (int i : a) {
        System.out.printf("%3d", i);
      }
      System.out.println();
    }
    System.out.println();
    for (int[] a : probArray) {
      for (int i : a) {
        System.out.printf("%3d", i);
      }
      System.out.println();
    }
  }
}

{{< /code >}}

{{< code lang="plaintext" title="出力結果（一例）" >}}
  1  2  3  4
  3  4  1  2
  4  3  2  1
  2  1  4  3

  0  0  0  4
  3  0  0  0
  4  3  0  0
  0  0  4  3
{{< /code >}}

* * *

今回はJavaでミニナンプレを作成してみました。以上で記事を終わりにします。