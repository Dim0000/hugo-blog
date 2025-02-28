# Hugo-blog

[![deploy](https://github.com/Dim0000/hugo-blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/Dim0000/hugo-blog/actions/workflows/deploy.yml)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Dim0000/hugo-blog/blob/main/LICENSE)

This is a miscellaneous blog created with Hugo.
Hugoで作成した雑記ブログです。

## URL

[https://dimzakki.com](https://dimzakki.com)

## Technologies Used

* Static Site Generator:
  * Hugo (Mainroad theme)
* Frontend:
  * HTML5/CSS3
  * JavaScript
* Backend:
  * Node.js
  * Google Analytics Data API
  * Amazon Product Advertising API
* Deployment:
  * AWS
    * S3 for hosting
    * CloudFront for CDN
    * Route 53 for DNS management
* CI/CD
  * GitHub Actions
* Environment setup
  * Docker
* etc.
  * Git
  * GitHub

## Docker Command

### Build Docker images

```text
`docker compose build`
```

### Start Hugo server

```text
`docker compose up -d # start Docker containers` 

`docker compose watch # hot reload`

`docker compose down # stop and remove containers`
```

### Create new content

```text
`docker compose exec hugo hugo new <file> # create new content file in Docker container`

`docker compose cp hugo:/src/content/<file> ./<directory> # copy file from Docker container to local directory`
```

### Obtain PV ranking

```text
* `docker compose -f compose.create-ranking.yml run --rm node # create JSON data for PV ranking`
```

### Obtain product data

```text
* `docker compose -f compose.create-products-json.yml run --rm node # create JSON data for product data`
```

### Convert webp

```text
* `docker compose -f compose.convert-webp.yml run node`
```