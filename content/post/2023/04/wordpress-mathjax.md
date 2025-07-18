---
title: 【MathJax】サイトに数式を簡単に表示させる
description: JavaScriptプラグインであるMathJaxを使い、プラグイン無しでWordPressやHugoで数式を表示させる方法を解説します。
date: 2023-04-30
categories: 
  - 技術記事
tags: 
  - ブログ運営
  - JavaScript
  - Wordpress
  - Hugo
archives:
  - 2023/04 
thumbnail: /images/mathjax.webp
mathjax: true
---

JavaScriptプラグインである**MathJax**を使い、プラグイン無しでWordPressやHugoで数式を表示させる方法を解説します。

<!--more-->

## WordPressでMathJaxを使う方法

WordPressで数式を使うには、プラグインを導入する方法、テーマエディターでヘッダーにコードを記述する方法などがあります。ヘッダーにコードを記述すると、全てのページでそのコードが適用されてしまうので、意図しない表示になるページが発生する可能性があります。

今回紹介する方法は、数式を表示させたいページ単体にMathJaxを読み込ませて数式を表示させたいと思います。

まず、表示させたいページで**カスタムHTMLブロック**に以下のコードを貼り付けます。

```html {lineNos="inline", name="カスタムHTMLブロック"}
<script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>
```

上記コードを貼り付けることで、そのページではMathJax（バージョン3）が有効になります。そして、数式を`\(`と`\)`で囲むことで、数式を\\(TeX\\)で表示させることができます。試しにテーラー展開の公式を文中に表示させます。

```plaintext {lineNos="inline", name="インライン数式"}
\( f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n} \)
```

文章の途中でも、\\( f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n} \\)のように数式を表示できます。

数式を`\[`と`\]`で囲むことでディスプレイ数式も可能です。

```plaintext {lineNos="inline", name="ディスプレイ数式"}
\[ f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n} \]
```

\\[ f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n} \\]

数式の表示ができました。

公式ページにデモ機能[^1]があるので、気軽に使ってみることも可能です。

[^1]:[Live Demo | MathJax](https://www.mathjax.org/#demo)

### 改行が出来ない場合

MathJaxでは`\\`で改行を行うことができますが、バージョン3では改行が効かないといった不具合[^2]があるようです。改行を行いたい場合はバージョン4のα版を使用することで、改行を行うことができます。

[^2]:[The line break(\) is not work | GitHub](https://github.com/mathjax/MathJax/issues/2312)

```plaintext {lineNos="inline", name="カスタムHTMLブロック"}
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-alpha.1/es5/tex-mml-chtml.js">
</script>
```

```plaintext {lineNos="inline", name="改行"}
\[ 1 \\ 2 \\ 3 \]
```

\\[ 1 \\\\ 2 \\\\ 3 \\]

改行されているのが分かります。

## HugoでMathJaxを使う方法

Hugoの場合、記事のフロントマターに`mathjax = true`を指定することで、MathJaxが有効化されます。

Hugoでは`$$`もしくは`\\[`と`\\]`で囲むことでディスプレイ形式で数式が表示できます。`\\(`と`\\`で囲むことでインライン形式で表示ができます。

```plaintext {lineNos="inline", name="インライン数式"}
数式：\\( f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n} \\)
```

数式：\\( f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n} \\)

```plaintext {lineNos="inline", name="ディスプレイ数式"}
$$
f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n}
$$
```

$$
f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^{n}
$$

改行は以下の様に書きます。

```plaintext {lineNos="inline", name="改行"}
\\[ 1 \\\\ 2 \\\\ 3 \\]
```

\\[ 1 \\\\ 2 \\\\ 3 \\]

改行の書き方もWordPressとちょっと違うので注意しましょう。

* * *

当ブログでは数式を用いるシチュエーションはそんなに無いのですが、一部ページでのみ使用することがあったので、ページ単位でMathJaxを使う方法を採用することにしました。以上で記事を終わりにします。

## 参考文献

* [Getting Started with MathJax Components | MathJax Documentation](https://docs.mathjax.org/en/latest/web/start.html)