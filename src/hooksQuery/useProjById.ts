import { APPIDS, KintoneRecord } from '../api/kintone';
import { useQuery } from 'react-query';

/**
 * 工事番号で、工事のデータを取得する。
 */
export const useProjById = (projId: string) => {
  return useQuery(
    [APPIDS.constructionDetails, projId],
    () => {
      return KintoneRecord.getRecord({
        app: APPIDS.constructionDetails,
        id: projId,
      }) as unknown as ProjectDetails.SavedData;
    },
    {
      enabled: !!projId,
    },
  );
};