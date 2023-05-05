import { useQuery } from '@tanstack/react-query';
import { downloadFile } from 'api-kintone';

export const useKintoneDownloadByFileKey = (fileKey: string) => {
  return useQuery(
    /**
     * Kintone just links file keys to fields,
     * so we don't need to specify the app id as a query key.
     * 
     * The file associated with the file key never changes.
     * Therefore, we don't need to invalidate the query along with the app id.
     * 
     * @see https://cybozu.dev/ja/kintone/docs/rest-api/files/download-file/
     * - ras 2023.05.02
     */
    ['kintone', fileKey],
    () => downloadFile(fileKey),
    {
      enabled: !!fileKey,
    },
  );
};
