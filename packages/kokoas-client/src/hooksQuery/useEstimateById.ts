
import { useEstimates } from './useEstimates';
import { useCallback } from 'react';
import { calculateEstimateRecord } from 'api-kintone/src/estimates/calculation/calculateEstimateRecord';


/**
 * 見積番号で取得する
 */
export const useEstimateById = (projEstimateId: string) => {

  return useEstimates(({
    enabled: !!projEstimateId,
    select: useCallback((data) => {
      const foundData = data.find(({ uuid }) => uuid.value === projEstimateId);
      if (foundData) {
        return {
          record: foundData,
          calculated: calculateEstimateRecord({ record: foundData }),
        };
      }
    }, [
      projEstimateId,
    ]),
  }));

};
