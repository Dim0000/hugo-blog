---
title: 【Android】Roomの主キーを複数設定する方法
description: KotlinでのAndroid開発でRoomの主キーを複数設定する方法について紹介します。
date: 2025-03-01
categories: 
  - 技術記事
tags: 
  - Android
  - Kotlin
archives:
    - 2025/03
thumbnail: /images/android.webp
---

**Kotlin**でのAndroid開発で`Room`の主キーを複数設定する方法について紹介します。

<!--more-->

## Roomで複合主キーを設定する

`Room`は`Android Jetpack`の一部であり、`SQLite`を簡単に扱うためのライブラリです。

データベースのテーブルは`Entity`で定義します。

ここで、複合主キーを設定したい場合、`@Entity`アノテーションの引数で、`primaryKeys = []`に設定します。

```kotlin {lineNos="inline", name="Entity.㏏"}
import androidx.room.ColumnInfo
import androidx.room.Entity

@Entity(tableName = "table", primaryKeys = ["main_id", "sub_id"])
data class Entity(
    @ColumnInfo(name = "main_id")
    val mainId: Int,
    @ColumnInfo(name = "sub_id")
    val subId: Int,
    val name: String
)
```

上のようにすることで、`main_id`と`sub_id`を主キーに設定できます。

* * *

今回は`Room`の主キーを複数設定する方法について紹介しました。以上で記事を終わりにします。

## 参考文献

* [Entity | Android Developers](https://developer.android.com/reference/androidx/room/Entity)
