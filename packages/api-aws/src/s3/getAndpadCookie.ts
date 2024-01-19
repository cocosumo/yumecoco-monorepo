import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3client } from './config';



export const getAndpadCookies = async () => {
  const command = new GetObjectCommand({
    Bucket: 'sanpokoken-auth',
    Key: 'cookies.json',
  });

  try {
    const response = await s3client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body?.transformToString();
    return  str;
  } catch (err) {
    console.error(err);
  }
};