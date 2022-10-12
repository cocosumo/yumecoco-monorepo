import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { APPIDS, KintoneRecord } from '../api/kintone';
import { calculateEstimateRecord } from '../api/others/calculateEstimateRecord';

const key = 'estimate';
type EstimatesQuery = {
  records: Estimates.main.SavedData[],
  calculated: ReturnType<typeof calculateEstimateRecord>[]
};

/* type EstimateQuery = {
  records: Estimates.main.SavedData,
  calculated: ReturnType<typeof calculateEstimateRecord>
}; */

/**
 * 見積番号で取得する
 */
export const useEstimateById = ({
  projEstimateId,
  projId,
} : {
  projEstimateId: string,
  projId?: string
}) => {

  const queryClient = useQueryClient();

  const data = queryClient
    .getQueryData([key, { projId }]) as EstimatesQuery | undefined;




  return useQuery(
    [key, { projEstimateId }],
    () => {

      if (!projEstimateId) {
        return {
          record: Object.create(null),
          calculated: Object.create(null),
        };
      }


      if (data?.records && !isEmpty(data?.records)) {
        const idx = data.records
          .findIndex(({ レコード番号: dbProjEstimateId }) => dbProjEstimateId.value === projEstimateId );
        return {
          record: data.records[idx],
          calculated : data.calculated[idx],
        };
      }

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

  );
};

/**
 * 工事番号で見積もりリストを取得する
 * @param projId
 * @returns 配列
 */
export const useEstimatesByProjId = (
  projId: string,
) => {
  const projIdKey : keyof Estimates.main.SavedData  = 'projId';

  return useQuery(
    [key, { projId }],
    () => {

      if (!projId) return {
        records: [],
        calculated: [],
      };

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
  );
};