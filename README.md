# Hugo-blog

[Dim雑記](https://dimzakki.com/)

Hugoで作成した雑記ブログです

## ビルド

* `docker compose up -d --コンテナ起動・ローカルでビルド` 

* `docker compose watch --ホットリロード`

* `docker compose down --コンテナ削除`

## 記事作成

* `docker compose exec hugo hugo new <file> --新規ファイル作成`

* `docker compose cp hugo:/src/content/<file> . --コンテナからローカルにコピー`

## PVランキング取得

* `docker-compose -f docker-compose.create-ranking.yml run node --PVランキング取得`