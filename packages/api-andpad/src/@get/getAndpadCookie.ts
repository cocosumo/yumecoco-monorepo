import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3client } from 'api-aws/src/s3/config';

/** 
 * Retrieve cached cookies from S3
 * 
 */
export const getAndpadCookies = async () => {
  const command = new GetObjectCommand({
    Bucket: 'sanpokoken-auth',
    Key: 'cookies.json',
  });

  try {
    // retrieve common session from S3
    const response = await s3client.send(command);
    const str = await response.Body?.transformToString();

    if (!str) {
      throw new Error('No cookies');
    }
    
    const cookies = JSON.parse(str);
    const cookiesValue: string = cookies
      .find(({ name }: { name: string, value: string }) => name === '_andpad_jp_production_session')
      .value;
    
    const cookiesString = `_andpad_jp_production_session=${cookiesValue}`;

    return cookiesString;
  } catch (err) {
    console.error(err);
    throw new Error('getAndpadCookies error');
  }
};