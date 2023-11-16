
import { useKintoneFile } from './useKintoneFile';

/**
 * Download kintone file by file key.
 * 
 * @param fileKey
 * @returns {string} // base64
 */
export const useKintoneFileBase64 = (fileKey: string, enabled = true ) => {

  const { data, ...others } = useKintoneFile(fileKey, enabled);

  return {
    ...others,
    data: data ? window.btoa(new Uint8Array(data).reduce(
      function (d, byte) {
        return d + String.fromCharCode(byte);
      },
      '',
    )) : undefined,
  };
};
