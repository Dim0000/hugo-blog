---
title: 【Java】isAlphabeticメソッドで文字が英数字か調べる方法
description: JavaのCharacterクラスのisAlphabeticメソッドで文字がアルファベットか判定する方法についてまとめます。
date: 2023-01-24
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2023/01
thumbnail: /images/java.webp
---

**Java**の`Characterクラス`の`isAlphabeticメソッド`で文字がアルファベットか判定する方法についてまとめます。

<!--more-->

## isAlphabeticメソッドの書式

`isAlphabeticメソッド`は、以下の様に記述します。

```java {lineNos="inline", name="isAlphabeticメソッドの書式"}
Character.isAlphabetic(int i);
```

文字を比較してアルファベットであれば`ture`、そうでなければ`false`を返します。戻り値の型は`boolean型`です。

## isAlphabeticメソッドの使用例

メソッドの使用例をサンプルコードで示します。

```java {lineNos="inline", name="IsAlphabeticTest.java"}
public class IsAlphabeticTest {
  public static void main(String[] args) {
    // a,0をそれぞれアルファベットかどうか判定する
    System.out.println(Character.isAlphabetic('a'));
    System.out.println(Character.isAlphabetic('0'));
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
true // aのアルファベット判定
false // 0のアルファベット判定
```

アルファベットの判定が出来ました。

* * *

今回は`isAlphabeticメソッド`の使い方の紹介でした。以上で記事を終わりにします。

## 参考文献

* [Character (Java Platform SE 7 ) | Oracle](https://docs.oracle.com/javase/jp/7/api/java/lang/Character.html)