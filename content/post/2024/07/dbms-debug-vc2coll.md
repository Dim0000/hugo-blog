---
title: 【SQL】DBMS_DEBUG_VC2COLLを使ってみる【Oracle】
description: 
date: 2024-07-19
categories: 
  - 技術記事
tags: 
archives:
    - 2024/07
thumbnail: /images/oracle.webp
---

今回は**Oracle SQL**で`DBMS_DEBUG_VC2COLL`を使ってみたいと思います。

<!--more-->

## DBMS_DEBUG_VC2COLLとは

`DBMS_DEBUG_VC2COLL`は、Oracleで使用されるPL/SQLパッケージの1つになります。

`DBMS_DEBUG_VC2COLL`で`VARCHAR2型`のデータのコレクションを管理でき、データの表示や処理を行うことができます。

## DBMS_DEBUG_VC2COLLの使用例

例として、「a」「b」の文字列を`DBMS_DEBUG_VC2COLL`に格納し、`TABLE関数`でコレクションを行形式で表示してみます。

```sql {lineNos="inline", name="test1.sql"}
SELECT COLUMN_VALUE FROM TABLE(SYS.DBMS_DEBUG_VC2COLL('a', 'b'))
```

```plaintext {lineNos="inline", name="実行結果"}
COLUMN_VALUE
a
b
```

「a」「b」が行形式で表示されました。ここで、`COLUMN_VALUE`はコレクションの各要素を表示するための疑似列です。

また、`COLUMN_VALUE`の取得結果にファンクションを使用することができます。一例で、`REPLACE関数`で「b」を「a」を変換してみます。

```sql {lineNos="inline", name="test2.sql"}
SELECT REPLACE(COLUMN_VALUE, 'b', 'a') FROM TABLE(SYS.DBMS_DEBUG_VC2COLL('a', 'b', 'c'))
```

```plaintext {lineNos="inline", name="実行結果"}
COLUMN_VALUE
a
a
c
```

「b」が「a」に変換されているのが分かります。

* * *

今回は`DBMS_DEBUG_VC2COLL`の使い方について紹介しました。以上で記事を終わりにします。

## 参考文献

* [58 DBMS_DEBUG | Oracle](https://docs.oracle.com/cd/F19136_01/arpls/DBMS_DEBUG.html)

