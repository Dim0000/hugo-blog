---
title: 【Java】deleteCharAtメソッドで文字列から文字を削除する方法
description: 文字列から文字を削除するにはStringBuilderクラス/StringBufferクラスのdeleteCharAtメソッドを使うことができます。これらのメソッドの使い方について紹介します。
date: 2022-04-30
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

文字列から文字を削除するには`StringBuilderクラス`/`StringBufferクラス`の`deleteCharAtメソッド`を使うことができます。これらのメソッドの使い方について紹介します。

## deleteCharAtメソッドの書式

`deleteCharAtメソッド`は以下の様に記述します。

{{< code lang="java" title="deleteCharAtメソッドの書式" >}}
文字列.deleteCharAt(数字);
{{< /code >}}

文字の位置を数字で指定して、文字列からその文字を削除した文字列が返されます。文字の位置は最初が0になります。配列の添え字と同じですね。

数字に文字数より大きい数字を入力すると`StringIndexOutOfBoundsException`のエラーが発生します。

`StringBuilderクラス`/`StringBufferクラス`の違いは**スレッドセーフ**かどうかになります。`StringBuilderクラス`はスレッドセーフでない分、`StringBufferクラス`より処理速度が速いです

続いて、メソッドの使用例をサンプルコードで紹介します。

{{< code lang="java" title="サンプルコード" >}}
public class DeleteCharAtTest {
  public static void main(String[] args) {
    // 文字列ABCDEから2の位置の文字を削除して出力する
    StringBuilder str = new StringBuilder("ABCDE");
    System.out.println("str:" + str);
    System.out.println("strの2の位置の文字を削除:" + str.deleteCharAt(2));
  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
str:ABCDE
strの2の位置の文字を削除:ABDE
{{< /code >}}

2行目では文字列「**ABCDE**」の位置2の文字である「**C**」が削除され「**ABDE**」が出力されています。

* * *

今回はJavaで文字列から文字を削除する方法について紹介しました。

似たメソッドに文字列から文字を取得する`Stringクラス`の`charAtメソッド`があるので注意しましょう。

以上で記事を終わりにします。

## 参考文献

* [StringBuilder (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/StringBuilder.html)

* [StringBuffer (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/StringBuffer.html)