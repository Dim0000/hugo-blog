---
title: 【Android】背景が透明なアプリを作成する方法
description: Androidアプリの開発時に、背景を透明にする方法について紹介します。
date: 2025-02-27
categories: 
  - 技術記事
tags: 
  - Android
  - Java
  - Kotlin
archives:
    - 2025/02
thumbnail: /images/android.webp
---

Androidアプリの開発時に、背景を透明にする方法について紹介します。

<!--more-->

## 背景を透明にする方法

アプリの背景を透明にするには、アプリのテーマを定義するXMLファイルに、`android:windowIsTranslucent`と`android:windowBackground`を設定します。

```xml {lineNos="inline", name="themes.xml"}
<item name="android:windowIsTranslucent">true</item>
<item name="android:windowBackground">@android:color/transparent</item>
```

`android:windowIsTranslucent`を`true`にすると背後が透けるUIになります。また、`android:windowBackground`に`@android:color/transparent`を設定することで、ウィンドウの背景色を透明にすることができます。

* * *

今回はAndroidアプリの背景を透明にする方法について紹介しました。以上で記事を終わりにします。

## 参考文献

* [windowIsTranslucent | Android Developers](https://developer.android.com/reference/android/R.attr#windowIsTranslucent)

* [windowBackground  | Android Developers](https://developer.android.com/reference/android/R.attr#windowBackground)
