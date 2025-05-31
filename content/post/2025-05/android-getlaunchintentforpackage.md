---
title: 【Android】インストール済みの起動可能なアプリを取得する方法
description: 今回はAndroidのPackageManagerクラスを使い、インストール済みの起動可能なアプリを取得する方法について紹介します。
date: 2025-05-31
categories: 
  - 技術記事
tags: 
  - Android
  - Kotlin
archives:
    - 2025/05
thumbnail: /images/android.webp
---

今回はAndroidの`PackageManagerクラス`を使い、インストール済みの起動可能なアプリを取得する方法について紹介します。

<!--more-->

## getLaunchIntentForPackageメソッドについて

`PackageManagerクラス`にある`getLaunchIntentForPackageメソッド`を使うことで、指定したアプリ（パッケージ）の起動用インテントを取得することができます。ここで、起動用インテントとは、アプリを起動するために必要なオブジェクトになります。

メソッドの書式は以下になります。

{{< code lang="kotlin" title="" >}}
val intent = packageManager.getLaunchIntentForPackage("com.example.app")
{{< /code >}}

メソッドでは、指定したパッケージ名（アプリ）に対して、アプリがユーザーによって起動可能な場合は起動用インテントを返し、起動できない場合は`null`を返します。

## インストール済みの起動可能なアプリを取得する

例えば、起動可能なアプリ一覧を取得したい場合、以下のようにメソッドを活用することができます。

{{< code lang="kotlin" title="" >}}
val pm = context.packageManager
val apps = pm.getInstalledApplications(PackageManager.GET_META_DATA)

val launchableApps = apps.filter {
    pm.getLaunchIntentForPackage(it.packageName) != null
}

launchableApps.forEach {
    val appName = pm.getApplicationLabel(it)
    val packageName = it.packageName
    Log.d("LaunchableApp", "$appName ($packageName)")
}
{{< /code >}}

上のようにすることで、起動可能なアプリ一覧を出力することができます。

* * *

今回はインストール済みの起動可能なアプリを取得する方法について紹介しました。以上で記事を終わりにします。

## 参考文献

* [PackageManager | Android Developers](https://developer.android.com/reference/android/content/pm/PackageManager)