# Hugo-blog

[Dim雑記](https://dimzakki.com/)

Hugoで作成した雑記ブログです

## ビルド

* `docker compose up -d --コンテナ起動・ローカルでビルド` 

* `docker compose watch --ホットリロード`

* `docker compose down --コンテナ削除`

## PVランキング取得

* `docker-compose -f docker-compose.create-ranking.yml run node --PVランキング取得`