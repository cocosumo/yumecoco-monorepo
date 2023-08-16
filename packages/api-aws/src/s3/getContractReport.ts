import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3client } from './config';



export const getContractReport = async () => {
  const command = new GetObjectCommand({
    Bucket: 'sanpokoken-templates',
    Key: 'ContractReport.png',
  });

  try {
    const response = await s3client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body?.transformToString();
    console.log(str);
  } catch (err) {
    console.error(err);
  }
};