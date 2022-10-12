import { useQuery } from '@tanstack/react-query';
import { APPIDS, KintoneRecord } from '../api/kintone';
import { calculateEstimateRecord } from '../api/others/calculateEstimateRecord';

const key = 'estimate';

/**
 * 見積を取得する
 */
export const useEstimateById = (projEstimatId: string) => {
  return useQuery(
    [key, { projEstimatId }],
    () => KintoneRecord.getRecord({
      app: APPIDS.projectEstimate,
      id: projEstimatId,
    }).then(({ record }) => {

      const newRecord = record as unknown as Estimates.main.SavedData;
      const calculated = calculateEstimateRecord(newRecord);

      return {
        record: newRecord,
        calculated,
      };
    }),

  );
};

export const useEstimatesByProjId = (
  projId: string,
) => {
  const projIdKey : keyof Estimates.main.SavedData  = 'projId';

  return useQuery(
    [key, { projId }],
    () => KintoneRecord.getRecords({
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
      }),
  );
};