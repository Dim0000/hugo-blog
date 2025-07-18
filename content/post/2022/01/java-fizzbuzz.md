---
title: 【Java】FizzBuzzを色々な方法で書いてみる
description: Javaでプログラムのアルゴリズム問題で有名なFizzBuzzを書いてみます。ノーマルな実装方法と、応用として拡張性を意識した実装方法を紹介します。
date: 2022-01-27
categories:
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/01
thumbnail: /images/java.webp
---

**Java**でプログラムのアルゴリズム問題で有名な**FizzBuzz**を書いてみます。ノーマルな実装方法と、応用として拡張性を意識した実装方法を紹介します。

<!--more-->

## FizzBuzzとは

FizzBuzzプログラムは、プログラミングを始めたばかりの人に出されることが多いアルゴリズムの問題です。初級者にとってはアルゴリズムの登竜門ですね。

私も、大学の頃C言語の授業で出された記憶があります。プログラミングを勉強している人は知っている人が多いのではないでしょうか。

{{< box "FizzBuzzのルール" >}}
* 1から100までの数字を画面に表示する
* 3の倍数のときは数字の代わりに「Fizz」と表示する
* 5の倍数のときは数字の代わりに「Buzz」と表示する
* 15の倍数のときは数字の代わりに「FizzBuzz」と表示する
{{< /box >}}

今回は100まで表示させると出力結果が長くなってしまうので、20まで出力させてみます。

## ノーマルな解答例

色々と解答方法があるかと思いますが、一番ノーマルな書き方で実装してみます。

```java {lineNos="inline", name="FizzBuzzTest1.java"}
public class FizzBuzzTest1 {
  public static void main(String[] args) {
    for (int num = 1; num <= 20; num++) {
      // 15で割り切れる時FizzBuzzと出力する
      if (num % 15 == 0) {
        System.out.println("FizzBuzz");
      }
      // 3で割り切れる時Fizzと出力する
      else if (num % 3 == 0) {
        System.out.println("Fizz");
      }
      // 5で割り切れる時Buzzと出力する
      else if (num % 5 == 0) {
        System.out.println("Buzz");
      }
      // それ以外はそのまま出力する
      else {
        System.out.println(num);
      }
    }
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
1
2   
Fizz
4   
Buzz
Fizz
7   
8   
Fizz
Buzz
11  
Fizz
13  
14
FizzBuzz
16
17
Fizz
19
Buzz
```

このアルゴリズムでは`if文`と`%演算子`を使って**倍数の判定**ができるかがポイントになります。その他、注意する点として**倍数の判定の順番**があります。最初に15の倍数判定をしないと、3もしくは5の倍数判定に通ってしまうため、ルールを満たさない結果が返ってきます。

## 拡張性を考えて実装してみる

上記の解答例だとノーマル過ぎて味気がありませんので、応用例としてルールの追加・変更に強いような実装方法を考えてみましょう。

例えば、条件を追加したり異なる条件にしたい時、上のコードではif文を適宜書き換えていけば実現できますが、いちいちif文の条件式を追加変更するのは少し面倒です。

コードの書き換えが簡単になるような実装にしてみます。

```java {lineNos="inline", name="FizzBuzzTest2.java"}
import java.util.Collections;
import java.util.Map;
import java.util.TreeMap;

public class FizzBuzzTest2 {
  public static void main(String[] args) {
    // 条件（倍数と文字列）の指定
    Map<Integer, String> fizzbuzzMap = new TreeMap<>(Collections.reverseOrder());
    fizzbuzzMap.put(3, "fizz");
    fizzbuzzMap.put(5, "buzz");
    fizzbuzzMap.put(15, "buzzfizz");
    // 表示を行う
    for (int num = 1; num <= 20; num++) {
      System.out.println(getString(num, fizzbuzzMap));
    }
  }

  // 倍数判定を行うメソッド
  private static String getString(int num, Map<Integer, String> fizzbuzzMap) {
    String str = String.valueOf(num);
    for (int key : fizzbuzzMap.keySet()) {
      if (num % key == 0) {
        return fizzbuzzMap.get(key);
      }
    }
    return str;
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
1
2   
Fizz
4   
Buzz
Fizz
7   
8   
Fizz
Buzz
11  
Fizz
13  
14
FizzBuzz
16
17
Fizz
19
Buzz
```

このコードでは`getStringメソッド`で倍数判定を行い、引数の`TreeMap`に倍数と表示したい文字列を格納しています。`Collections.reverseOrder()`を指定することで、`TreeMap`を自動でキーの降順に並び替えられます。ここでキーの降順に並び替えているのは、数字の大きい順に倍数判定を行わないと正しい判定がされないからです（15の判定時に3の倍数判定がされて「Fizz」が戻ってくるなど）。

条件を変えたい時は`putメソッド`の所を好きな物に書き換えるだけで良いので、最初のコードよりかはルール変更に強い実装にすることができました。

* * *

色々と実装方法はありますので、皆さんも気軽に挑戦してみましょう。以上で記事を終わりにします。

## 参考文献

* [TreeMap (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/util/TreeMap.html)

* [Collections (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/util/Collections.html)