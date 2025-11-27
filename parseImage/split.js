import sharp from 'sharp';


export async function splitImage() {
  const imagePath = '../png/rescpt3.png';
  const outputTop = '../cut/top.png';
  const outputBottom = '../cut/bottom.png';

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

  console.log('Image split completed!');

}