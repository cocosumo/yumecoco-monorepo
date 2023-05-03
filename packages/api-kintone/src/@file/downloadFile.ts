import { ktClient } from '../client';

export const downloadFile = async (fk: string) => {
  const KintoneClient = await ktClient();

  const arrayBuffer = await KintoneClient.file.downloadFile({
    fileKey: fk,
  });
  const base64String =  window.btoa(new Uint8Array(arrayBuffer).reduce(
    function (data, byte) {
      return data + String.fromCharCode(byte);
    },
    '',
  ));
  return base64String;
};