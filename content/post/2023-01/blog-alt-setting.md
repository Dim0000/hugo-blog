---
title: 【WordPress】alt属性を自動で記事タイトルに設定する【プラグインなし】
description: 今回はWordPressで画像のalt属性（代替テキスト）をプラグインを使わずに一括で記事タイトルに変更する方法を紹介します。
date: 2023-01-14
categories:
  - 技術記事
tags: 
  - ブログ運営
  - Wordpress
  - PHP
archives:
  - 2023/01 
thumbnail: /images/wordpress.webp
---

今回は**WordPress**で画像の**alt属性**（代替テキスト）をプラグインを使わずに一括で記事タイトルに変更する方法を紹介します。

<!--more-->

## WordPressでの代替テキストの設定について

Webサイトの画像のalt属性は、設定することで検索エンジンに画像の内容をより正確に伝えることができます。WordPressでは画像のalt属性は「代替テキスト」により設定されます。

代替テキストを設定するには以下の2パターンの標準的な方法があります。

{{< box "代替テキストを設定する方法" >}}
<ul>
<li>画像アップロード時に設定する</li>
<li>各記事の画像ブロックで直接設定する</li>
</ul>
{{< /box >}}

### 画像アップロード時に代替テキストを設定する方法

画像アップロード時に代替テキストを設定した場合、メディアライブラリの画像ファイルにも代替テキストが保存されます。その後各記事で画像を貼った時に、アップロード時の代替テキストが自動で適用されます。

### 各記事の画像ブロックで代替テキストを設定する方法

この方法は注意が必要です。

画像アップロード時に代替テキストを設定せずに、各記事の画像に個別に代替テキストを設定した場合、メディアライブラリにはその代替テキストが保存されません。つまり、画像を他の記事に添付したい場合はまた代替テキストを設定する必要があります。

また、両方で共通する注意点として、後からメディアライブラリで代替テキストを変更した場合、各記事に添付されている画像の代替テキストは変更されません。

## 空のalt属性を変更する方法

既に各記事に画像を大量にアップロードしている場合、空のalt属性を1つ1つ修正していくのには時間が掛かります。しかし、alt属性のために余計なプラグインを入れるとかえって重くなったりするので避けたいところです。

応急処置として、alt属性が空の場合に自動で文字列を挿入できないか調べてみます。すると、有用そうなブログ記事を発見したのでそこに載っていたコードを若干改良してみました。

以下のコードを`functions.php`に貼り付けることで動作します。

{{< code lang="php" title="functions.php" >}}
function my_set_img_alt_title( $content ) {
  global $wpdb;
  if ( preg_match_all( '/<img [^>]+alt=""[^>]+>/i', $content, $images ) ) {
    foreach( $images[0] as $image ) {
      if ( preg_match( '/src=[\'"]([^\'"]+)[\'"]/i', $image, $src ) ) {
        if ( preg_match( '/([^\/]+?)(-e\d+)?(-\d+x\d+)?(\.\w+)?$/', $src[1], $file ) ) {
          $attachiment_id = (int)$wpdb->get_var( $wpdb->prepare( "SELECT ID FROM {$wpdb->posts} WHERE post_name=%s", $file[1] ) );
          if ( $attachiment_id ) {
            $alt = get_post_meta( $attachiment_id, '_wp_attachment_image_alt', true );
            if ( $alt === '' ){
              $alt = get_the_title();
            }
            $replace = str_replace( 'alt=""', 'alt="' . esc_attr( $alt ) . '" ',  $image );
            $content = str_replace( $image, $replace, $content );
          }
        }
      }
    }
  }
  return $content;
}
add_filter( 'the_content', 'my_set_img_alt_title' );
{{< /code >}}

画像のalt属性が空だった場合は、メディアライブラリの代替テキストを取得します。更に改良点として、メディアライブラリの代替テキストも空だった場合に記事のタイトルを取得しalt属性に設定するように手を加えました。

このコードではあえてalt属性を設定したくない画像にも記事タイトルが設定されてしまうためご注意ください。

* * *

alt属性に記事タイトルを入れるのはあくまで応急処置的な処置なので、後々ちゃんと個別に設定していった方がベターですね。以上で記事を終わりにします。

## 参考文献

* [WordPressのALT属性(代替テキスト)の設定と保存先 | sakue.com](https://sakue.com/archives/3295)

* [alt属性を自動入力するプラグインについて | ja.wordpress.org](https://ja.wordpress.org/support/topic/alt%E5%B1%9E%E6%80%A7%E3%82%92%E8%87%AA%E5%8B%95%E5%85%A5%E5%8A%9B%E3%81%99%E3%82%8B%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/)