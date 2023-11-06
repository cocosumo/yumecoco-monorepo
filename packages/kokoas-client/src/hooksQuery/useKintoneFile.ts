import { useQuery } from '@tanstack/react-query';
import { downloadFile } from 'api-kintone';

/**
 * Download kintone file by file key.
 * 
 * @param fileKey
 * @returns {ArrayBuffer}
 */
export const useKintoneFile = (fileKey: string, enabled = true) => {
  return useQuery(

    ['kintone', fileKey],
    () => downloadFile(fileKey),
    {
      enabled: !!fileKey && enabled,
    },
  );
};
