import { useQuery } from '@tanstack/react-query';
import { APPIDS, KintoneRecord } from '../api/kintone';
import { calculateEstimateRecord } from '../api/others/calculateEstimateRecord';

/**
 * 工事番号で見積リストを取得する
 * @param projId
 * @returns {Estimates.main.SavedData[]} 見積リスト
 */
export const useEstimatesByProjId = (
  projId: string,
) => {
  const projIdKey : keyof Estimates.main.SavedData  = 'projId';

  return useQuery(
    [APPIDS.projectEstimate, projId],
    () => {

      return KintoneRecord.getRecords({
        app: APPIDS.projectEstimate,
        query: `${projIdKey} = "${projId}"`,
      })
        .then(({ records }) => {
          const newRecords = records as unknown as Estimates.main.SavedData[];
          const calculated = newRecords.map((rec) => calculateEstimateRecord(rec));

          return {
            records: newRecords,
            calculated,
          };
        });
    },
    {
      enabled: !!projId,
    },
  );
};