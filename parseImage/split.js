import sharp from 'sharp';
import { getFileList } from './util.js';
import path from 'path';
import chalk from 'chalk';
import Tesseract from "tesseract.js";

const top =  '../cut/top.png';
const bottom =  '../cut/bottom.png'

// await splitImage('./uploads/waltermart.png', top,  bottom);

async function splitImage(path, topFileName, bottomFileName) {

  console.log('Path file --> ', path);
  console.log('Top file name --> ', topFileName);
  console.log('Bottom file name --> ', bottomFileName);

  const imagePath = path; //  '../png/rescpt3.png'
  const outputTop = topFileName; // '../cut/top.png'
  const outputBottom = bottomFileName; // '../cut/bottom.png'

  const image = sharp(imagePath);
  const metadata = await image.metadata();

  const width = metadata.width;
  const height = metadata.height;
  const halfHeight = Math.floor(height / 2);
  const bottomHeight = height - halfHeight;

  console.log("Total height :: ", height);
  console.log("Half Height :: ", halfHeight);
  console.log("Bottom Height :: ", bottomHeight);

  // Top half
  await image
    .clone()
    .extract({ left: 0, top: 0, width: width, height: halfHeight })
    .toFile(outputTop);

  // Bottom half
  await image
    .clone()
    .extract({ left: 0, top: halfHeight, width: width, height: bottomHeight })
    .toFile(outputBottom);

  console.log(chalk.green('Image split completed!'));
}

export async function splitImageList(filePath) {

  const fileList = getFileList(filePath);
  console.log('File list', fileList);
  const sourceDir = filePath + '/';
  const outputDir = '../cut/';
  const ext = ['top.png', 'bottom.png'];

  const taskList = Array.from({ length: fileList.length }, () => splitImage);

  let index = 0;

  for await (const splitImg of taskList) {
    let extInd = 0;
    const { name } = path.parse(fileList[index]);

    const sourceDirMain = sourceDir + fileList[index];
    const outputDirTop = outputDir + name + '-' + ext[extInd];
    const outputDirBottom = outputDir + name + '-' + ext[extInd + 1];

    splitImg(sourceDirMain, outputDirTop, outputDirBottom);

    index++;
  }
}


// await splitImageList('./uploads');




// quality check
// const { data } = await Tesseract.recognize("../cut/top.png", "eng", {
//   tessedit_do_invert: 0,
// });

// async function checkBrightness(img) {
//   const stats = await sharp(img).stats();
//   return stats.channels[0].mean; // grayscale brightness
// }

// console.log("confidence:", data.confidence);
// console.log('Brightness :', await checkBrightness('../cut/top.png'));
