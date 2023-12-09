---
title: 【Java】LocalDateクラスで日付を加算・減算する方法
description: 今回はJavaのLocalDateクラスで日付の加算と減算を行う方法について紹介します。
date: 2022-04-07
lastmod: 2023-11-01
categories: 
  - IT知識
tags: 
  - Java
archives: 
  - 2022/04
thumbnail: /images/java.png
# draft: false
---

今回はJavaの`LocalDateクラス`で**日付の加算と減算**を行う方法について紹介します。

{{< box "関連記事" >}}
<ul>
<li>{{< ref "/java-localdate-period" >}}</li>
</ul>
{{< /box >}}

## 日付を加算・減算する方法

`LocalDateクラス`には、`plusDaysメソッド`や`minusDaysメソッド`といった日付を指定した分増やしたり減らしたりするメソッドが存在します。

書式については、以下の様に記述します。`plusDaysメソッド`を例に紹介します。

{{< code lang="java" title="plusDaysメソッドの記述例" >}}
変数名.plusDays(数字);
{{< /code >}}

上では、`LocalDateクラス`の変数に数字分の日にちを加算しています。

メソッドは日・週・月・年ごとにそれぞれ`pulsメソッド`と`minusメソッド`があります。

## メソッドの使用例

それぞれのメソッドの使用例をサンプルコードで紹介します。

{{< code lang="java" title="サンプルコード" >}}
import java.time.LocalDate;

public class LocalDateTest {
  public static void main(String[] args) {
    // 2021-01-01を生成する
    LocalDate localdate = LocalDate.of(2021, 1, 1);
    System.out.println("localdate:" + localdate);

    // localdateの2日後と3日前を出力する
    System.out.println("localdateの2日後:" + localdate.plusDays(2));
    System.out.println("localdateの3日前:" + localdate.minusDays(3));

    // localdateの2週後と3週前を出力する
    System.out.println("localdateの2週後:" + localdate.plusWeeks(2));
    System.out.println("localdateの3週前:" + localdate.minusWeeks(3));

    // localdateの2月後と3月前を出力する
    System.out.println("localdateの2月後:" + localdate.plusMonths(2));
    System.out.println("localdateの3月前:" + localdate.minusMonths(3));

    // localdateの2年後と3年前を出力する
    System.out.println("localdateの2年後:" + localdate.plusYears(2));
    System.out.println("localdateの3年前:" + localdate.minusYears(3));

  }
}
{{< /code >}}

{{< code lang="plaintext" title="出力結果" >}}
localdate:2021-01-01
localdateの2日後:2021-01-03
localdateの3日前:2020-12-29
localdateの2週後:2021-01-15
localdateの3週前:2020-12-11
localdateの2月後:2021-03-01
localdateの3月前:2020-10-01
localdateの2年後:2023-01-01
localdateの3年前:2018-01-01
{{< /code >}}

それぞれ日付が加減されていることがわかります。

* * *

今回はJavaで日付の加算と減算を行う方法を紹介しました。以上で記事を終わりにします。

## 参考文献

* [LocalDate (Java Platform SE 8 ) | Oracle](https://docs.oracle.com/javase/jp/8/docs/api/java/time/LocalDate.html)