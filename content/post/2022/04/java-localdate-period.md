---
title: 【Java】LocalDateクラスで日付の期間を計算する方法
description: JavaのLocalDateクラスで日付の期間を計算する方法について紹介します。
date: 2022-04-23
categories: 
  - 技術記事
tags: 
  - Java
archives: 
  - 2022/04
thumbnail: /images/java.webp
---

Javaの`LocalDateクラス`で**日付の期間を計算する方法**について紹介します。

<!--more-->

{{< box "関連記事" >}}
* [](java-localdate-addition-subtraction)
{{< /box >}}

## Periodクラスで日付の期間を計算する方法

`Periodクラス`の`betweenメソッド`を使うことで2つの日付の期間を計算することができます。`betweenメソッド`は以下の様に記述します。

```java {lineNos="inline", name="betweenメソッドの記述例"}
Period period = Period.between(LocalDate date1, LocalDate date2);
```

変数に変数1と変数2の期間を代入しています。

また、`getメソッド`によって年・月・日を取り出すことができます。`getメソッド`は`getYears`・`getMounths`・`getDaysメソッド`が存在します。

## メソッドの使用例

実際に、メソッドの使用例をサンプルコードで示します。

```java {lineNos="inline", name="LocalDateBetweenTest.java"}
import java.time.LocalDate;
import java.time.Period;

public class LocalDateBetweenTest {
  public static void main(String[] args) {
    LocalDate date1 = LocalDate.of(2020, 1, 1);
    LocalDate date2 = LocalDate.of(2021, 8, 15);
    System.out.println("date1:" + date1);
    System.out.println("date2:" + date2);

    // date1とdate2の期間を取得する
    Period period = Period.between(date1, date2);
    System.out.println("period:" + period);

    // priodを年、月、日に分割して出力する
    System.out.println("periodの年:" + period.getYears());
    System.out.println("periodの月:" + period.getMonths());
    System.out.println("periodの日:" + period.getDays());
  }
}
```

実行結果が以下になります。

```plaintext {lineNos="inline", name="出力結果"}
date1:2020-01-01
date2:2021-08-15
period:P1Y7M14D
periodの年:1
periodの月:7
periodの日:14
```

`date1`と`date2`の期間が出力されました。

ここで、出力結果の一行目が分かりづらくなっていますが、最初のPを飛ばし、「`1Y`(年)`7M`(月)`14D`(日)」の期間であるという意味を持ちます。 

その下はそれぞれ`getメソッド`で分割して表示しています。

## 参考文献

* [LocalDate (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/time/LocalDate.html)

* [Period (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/time/Period.html)