---
title: 【Java】internメソッドの仕組みをまとめる【コンスタントプール】
description: JavaのStringクラスのinternメソッドについて、その機能と使い方をまとめます。
date: 2022-09-11
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/09
thumbnail: /images/java.webp
---

**Java**の`Stringクラス`の`internメソッド`について、その機能と使い方をまとめます。

<!--more-->

## internメソッドの機能と書式例

`internメソッド`はコンスタントプールの文字列を探します。コンスタントプールとは、重複する定数（特に文字列）を1か所にまとめて保持するメモリ領域のことです。

同じ文字列が存在すればその文字列を返し、同じ文字列が存在しない場合は新たに文字列を生成します。

文章だと分かりにくいので、下にあるサンプルコードで動きを理解しましょう。

メソッドの書式例は以下の通りです。

```java {lineNos="inline", name="internメソッドの書式例"}
// 文字列がコンスタントプールにあるか検索
<文字列>.intern();
```

## internメソッドの使用例

メソッドの使用例をサンプルコードで示します。

```java {lineNos="inline", name="InternTest.java"}
public class InternTest {
  public static void main(String[] args) {
    String s1 = new String("123");
    String s2 = "123";
    String s3 = s1.intern();
    String s4 = s2.intern();

    System.out.println("s1 == s2:" + (s1 == s2));
    System.out.println("s1 == s3:" + (s1 == s3));
    System.out.println("s2 == s3:" + (s2 == s3));
    System.out.println("s3 == s4:" + (s3 == s4));
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
s1 == s2:false
s1 == s3:false
s2 == s3:true
s3 == s4:true
```

サンプルコードでは、`s1`は`new演算子`によってインスタンス化されています。`s2`とは参照先が違うため`s1 == s2`は`false`となります。

`s3`は「コンスタントプール内の`s1`と同じ文字列」を探しますが、`s1`はインスタンス化されているため見つけることが出来ず、新たに文字列を生成しています。よって参照先が異なるため`s1 == s3`は`false`となります。

`s2`と`s3`では、`s3`は「コンスタントプール内の`s1`と同じ文字列」を探しています。`s2`に`s1`と同じ文字列が入っているため、`s3`に「`s2`と同じ参照先の文字列」を代入します。よって`s2 == s3`は`true`になります。

`s3`と`s4`に関してもそれぞれ同じ文字列が`s2`に入っているため、どちらも「`s2`と同じ参照先の文字列」を代入します。よって`s3 == s4`は`true`になります。

* * *

今回は`internメソッド`の紹介でした。以上で記事を終わりにします。

## 参考文献

* [String (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/String.html)