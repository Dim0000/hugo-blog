---
title: 【JavaScript】変数varは使わない方が良い理由【const・let】
description: 今回はJavaScriptの変数型var・let・constについて、varの使用が非推奨とされる理由について、各変数宣言の特徴や巻き上げなどの観点からまとめていきます。
date: 2022-09-05
lastmod: 2023-10-27
categories: 
  - 技術記事
tags: 
  - JavaScript
archives: 
  - 2022/09
thumbnail: /images/javascript.png
# draft: false
---

今回はJavaScriptの変数型`var`・`let`・`const`について、`var`の使用が非推奨とされる理由について、各変数宣言の特徴や巻き上げなどの観点からまとめていきます。

## JavaScriptの変数宣言の特徴

JavaScriptの変数宣言には`var`・`let`・`const`の3種類があります。

{{< code lang="javascript" title="JavaScriptの変数宣言" >}}
var a;
let b;
const c;
{{< /code >}}

それぞれの特徴について見てみましょう。

||`var`|`let`|`const`|
| :---: | :---: | :---: | :---: |
|再代入|○|○|×|
|再宣言|○|×|×|
|スコープ|関数スコープ|ブロックスコープ|ブロックスコープ|

### 再代入

**再代入**とは宣言した変数に、再度値を代入することです。`var`・`let`は再代入が可能ですが、`const`は不可能です。

{{< code lang="javascript" title="再代入" >}}
//再代入可能
var a = 1;
a = 2;

//再代入可能
let b = 1;
b = 2;

//エラーが起きる
//Uncaught TypeError:
const c = 1;
c = 2;
{{< /code >}}

ここで、`const`は単なる再代入はできませんが、オブジェクト型の中身を変更することができます。

{{< code lang="javascript" title="再代入" >}}
const obj = {
  id: 01;
  name: "オブジェクト1";
}
obj.name = "オブジェクト2";
//オブジェクトの中身は変えられる
{{< /code >}}

### 再宣言

**再宣言**とは、宣言した変数名を再度宣言し直すことです。`var`は再宣言が可能ですが、`let`・`const`は不可能です。

{{< code lang="javascript" title="再宣言" >}}
//再宣言可能
var a = "宣言1回目";
var a = "宣言2回目";

//エラーが起きる
//Uncaught SyntaxError:
let b = "宣言1回目";
let b = "宣言2回目";

//エラーが起きる
//Uncaught SyntaxError:
const c = "宣言1回目";
const c = "宣言2回目";
{{< /code >}}

### スコープ

**スコープ**とは関数を呼び出すことが出来る範囲のことです。`var`のスコープは**関数スコープ**であり、ある関数内で宣言した変数は、その関数のどこからでも呼び出すことができます。

{{< code lang="javascript" title="スコープ" >}}
function x() {

  var a = 1;
  console.log(a); 
  {

    a = 2;
    console.log(a);
  }
  console.log(a);
}

//出力結果
//1
//2
//2
{{< /code >}}

対して、`let`・`const`のスコープは**ブロックスコープ**です。関数スコープと違い、関数内の記述位置でスコープから外れます。

{{< code lang="javascript" title="スコープ" >}}
function x() {

  let b = 1;
  console.log(b); 
  {

    b = 2;
    console.log(b);
  }
  console.log(b);
}

//出力結果
//1
//2
//1
{{< /code >}}

## 変数の巻き上げについて

JavaScriptには**変数の巻き上げ**という独特の特徴を有しています。関数内で宣言された変数は、関数の先頭で宣言したとみなされます。

{{< code lang="javascript" title="変数の巻き上げ" >}}
var x = "Test1";

function func() {
  console.log(x);  // undefinedが出力される
  var x = "Test2";
  console.log(x); // Test2
}
{{< /code >}}

上のコードでは`x`の宣言前に`console.log`で記述していて、一見`Test1`が出力される気がしますが、`undefined`（未定義）が出力されます。これが変数の巻き上げで、上のコードは実行時には下のコードのように見なされます。

{{< code lang="javascript" title="変数の巻き上げ" >}}
var x = "Test1";

function func() {
  var x; //変数の巻き上げ
  console.log(x); // undefinedが出力される
  x = "Test2";
  console.log(x); // Test2
}
{{< /code >}}

## varの利用が非推奨な理由

上で述べた様に、`var`は再宣言・再代入が可能であること、スコープの範囲が広いこと、巻き上げの特徴を持つことから、変数の値が意図しない影響を受けてしまう可能性があります。

上記のような仕様から、特に複雑なソースコードでは`var`を使用を避けるべきであると言えます。

基本的には変数宣言には`const`を使い、`const`だけでは難しい場合に`let`を使うようにしましょう。例えば`for文`などは使うのは`let`ですね。

* * *

今回はJavaScriptの変数型についてまとめました。以上で記事を終わりにします。

## 参考文献

* [var - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/var)

* [変数 | 現代の JavaScript チュートリアル](https://ja.javascript.info/variables)

* [古い var | 現代の JavaScript チュートリアル](https://ja.javascript.info/var)