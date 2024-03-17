const sharp = require('sharp');
const fs = require('fs');
const fsPromise = fs.promises;
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');

const ORIGINAL_IMG_DIR = glob.sync('/node/assets/images/thumbnails');

/**
 * 画像をWebP形式に変換
 * @param {string} imgPath 元画像のフルパス
 * @param {string} outputDir 出力先のディレクトリ
 * @param {string} outputFilePath 出力するファイルパス
 */
const changeWebpImages = (imgPath, outputDir, outputFilePath) => {
  const fileName = outputFilePath.split('/').reverse()[0]; // 拡張子を含む画像ファイル名
  const imgName = fileName.split('.')[0]; // 拡張子を除く画像ファイル名
  if (!fs.existsSync(`${outputDir}${imgName}.webp`)) {
    sharp(imgPath)
      .webp({
        quality: 75
      })
      .toFile(`${outputDir}${imgName}.webp`, (err) => { // 画像ファイル名.webpで出力
        if (err) console.error(err);
        return;
      });
  }
};

/**
 * 元画像のファイル情報を読み取ってWebPに変換する関数を実行
 */
async function writeFiles() {
  ORIGINAL_IMG_DIR.forEach((dirName, i) => {
    const resolvedPath = path.resolve(dirName);
    fsPromise.readdir(resolvedPath)
      .then((files) => {
        files.forEach((file) => {
          changeWebpImages(`${resolvedPath}/${file}`, `${resolvedPath}/`, `${resolvedPath}/${file}`);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}

async function init() {
  await writeFiles();
}

init();