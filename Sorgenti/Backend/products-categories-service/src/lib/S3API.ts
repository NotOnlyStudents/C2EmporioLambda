import * as fileType from 'file-type';
import { v4 as uuidv4 } from 'uuid';

import S3Repository from 'src/repositories/S3Repository';

const base64DataRegex = /^data:image\/(png|jpeg);base64/;

export function isBase64Data(data: string) {
  return data.match(base64DataRegex);
}

async function uploadImageToS3(
  s3: S3Repository,
  image: string,
): Promise<string> {
  let imageData: string = image;
  let imageUrl: string;

  if (isBase64Data(imageData)) {
    imageData = imageData.replace(base64DataRegex, '');
  }

  const buffer = Buffer.from(imageData, 'base64');
  const fileInfo = await fileType.fromBuffer(buffer);

  const detectedExt = fileInfo.ext;
  const name = uuidv4();

  const key = `${name}.${detectedExt}`;

  try {
    imageUrl = await s3.uploadImage(buffer, key);
  } catch (e) {
    imageUrl = '';
  }

  return imageUrl;
}

async function deleteImageFromS3(
  s3: S3Repository,
  url: string,
): Promise<void> {
  const key: string = url.substr(url.lastIndexOf('/') + 1);

  console.log(key);

  await s3.deleteImage(key);
}

export {
  uploadImageToS3,
  deleteImageFromS3,
};
