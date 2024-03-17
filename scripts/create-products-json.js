const export_function = require('./pa-api');
const fs = require('fs');

const products = [];

/**
 * 楽天用のデータ読み込み・書き込み
 */
const products_rakuten = JSON.parse(fs.readFileSync('data/products_rakuten.json', 'utf8'));
products_rakuten.info.forEach(data => {
    data.type = "rakuten";
});
products.push(...products_rakuten.info);

/**
 * Amazon用のデータ取得（API）・書き込み
 */
let products_amazon = [];
const asin = JSON.parse(fs.readFileSync('data/products_amazon.json', 'utf8')).asin;
const dividedAsinArrays = [];
const chunkSize = 10;
for (let i = 0; i < asin.length; i += chunkSize) {
    dividedAsinArrays.push(asin.slice(i, i + chunkSize));
}
// 各export_function.getItemsの呼び出しに対するPromiseを生成する関数
function delayedGetItems(subArray, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            export_function.getItems(subArray)
                .then(data => {
                    const items = data.ItemsResult.Items.map(itemData => ({
                        itemid: itemData.ASIN,
                        title: itemData.ItemInfo.Title.DisplayValue,
                        url: itemData.DetailPageURL,
                        image: itemData.Images.Primary.Medium.URL,
                        type: "amazon"
                    }));
                    resolve(items);
                })
                .catch(error => {
                    console.error('Error occurred:', error);
                    resolve([]);
                });
        }, delay);
    });
}
// すべてのPromiseを格納するための配列
const promises = [];
const delayBetweenCalls = 2000; // 2秒の遅延
dividedAsinArrays.forEach((subArray, index) => {
    // 各export_function.getItemsの呼び出しに対するPromiseを生成し、遅延を追加してpromises配列に追加
    const promise = delayedGetItems(subArray, index * delayBetweenCalls);
    promises.push(promise);
});
// すべてのPromiseが解決された後に処理を行う
Promise.all(promises)
    .then(results => {
        products_amazon = results.flat();
        products.push(...products_amazon);

        fs.writeFileSync(
            'data/products.json',
            JSON.stringify(
                {
                    items: products,
                },
                null,
                4
            )
        );
    });