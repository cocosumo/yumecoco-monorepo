import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3client } from './config';


/**
 * AWS S3 からテンプレートを取得する
 * @param fileName 
 * @returns 
 */
export const getTemplate = async (fileName: string) => {
  const command = new GetObjectCommand({
    Bucket: 'sanpokoken-templates',
    Key: fileName,
  });

  try {
    const response = await s3client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    return await response.Body?.transformToByteArray();
  } catch (err) {
    console.error(err);
  }
};