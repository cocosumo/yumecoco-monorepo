

import { calculateEstimateRecord, getEstimateById } from 'api-kintone';
import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';


/**
 * 見積番号で取得する
 */
export const useEstimateById = (projEstimateId: string ) => {

  return useQuery({
    queryKey: [AppIds.projEstimates, projEstimateId],
    queryFn: async () => {
      const record = await getEstimateById(projEstimateId);
      return {
        record,
        calculated: calculateEstimateRecord({ record }),
      };
    },
  });

};
