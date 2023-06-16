import { ktClient } from '../client';

export const downloadFile = async (fk: string) => {
  const KintoneClient = await ktClient();

  return KintoneClient.file.downloadFile({
    fileKey: fk,
  });

};