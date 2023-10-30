import { useQuery } from '@tanstack/react-query';
import { downloadFileBase64 } from 'api-kintone/src/@file/downloadFileBase64';

/**
 * Download kintone file by file key.
 * 
 * @param fileKey
 * @returns {string} // base64
 */
export const useKintoneFileBase64 = (fileKey: string, enabled = true ) => {
  return useQuery(

    ['kintone', fileKey],
    () => downloadFileBase64(fileKey),
    {
      enabled: !!fileKey && enabled,
    },
  );
};
