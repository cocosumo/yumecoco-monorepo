import { downloadFile } from './downloadFile';

/**
 * @deprecated useKintoneFileBase64 でキャッシュを利用し、変換することになりました。
 */
export const downloadFileBase64 = async (fk: string) => {

  const arrayBuffer = await downloadFile(fk);
  const base64String =  window.btoa(new Uint8Array(arrayBuffer).reduce(
    function (data, byte) {
      return data + String.fromCharCode(byte);
    },
    '',
  ));

  return base64String;
};