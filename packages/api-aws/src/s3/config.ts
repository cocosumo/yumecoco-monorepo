import { S3Client } from '@aws-sdk/client-s3';

console.log(process.env.AWS_S3_ACCESS_KEY);

export const s3client = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
  },
});

