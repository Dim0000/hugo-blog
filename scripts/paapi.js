require('dotenv').config();
const ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk');

const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
defaultClient.accessKey = process.env.ACCESS_KEY_ID;
defaultClient.secretKey = process.env.SECRET_ACCESS_KEY;
defaultClient.host = 'webservices.amazon.co.jp';
defaultClient.region = 'us-west-2';

const api = new ProductAdvertisingAPIv1.DefaultApi();

const getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();

getItemsRequest['PartnerTag'] = process.env.ASSOCIATES_TAG;
getItemsRequest['PartnerType'] = 'Associates';
getItemsRequest['Condition'] = 'New';
getItemsRequest['Resources'] = ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price'];

exports.getItems = function (asin) {
  return new Promise((resolve, reject) => {
    getItemsRequest['ItemIds'] = asin;
    console.log(asin);
    api.getItems(getItemsRequest, (error, data) => {
      if (error) {
        console.error('Error occurred:', error);
        reject(error); // エラー時の処理
      } else {
        console.log('Successfully retrieved data');
        resolve(data); // 成功時の処理
      }
    });
  });
}