import { useQuery } from '@tanstack/react-query';
import { APPIDS, KintoneRecord } from '../api/kintone';
import { calculateEstimateRecord } from '../api/others/calculateEstimateRecord';

/**
 * 見積番号で取得する
 */
export const useEstimateById = (projEstimateId: string) => {


  return useQuery(
    [APPIDS.projectEstimate, projEstimateId],
    () => {

      return KintoneRecord.getRecord({
        app: APPIDS.projectEstimate,
        id: projEstimateId,
      }).then(({ record }) => {

        const newRecord = record as unknown as Estimates.main.SavedData;
        const calculated = calculateEstimateRecord(newRecord);

        return {
          record: newRecord,
          calculated,
        };
      });
    },
    {
      enabled: !!projEstimateId,
      initialData: {
        record: Object.create(null),
        calculated: Object.create(null),
      },
    },
  );
};
