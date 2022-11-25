
import { calculateEstimateRecord } from 'api-kintone';
import { useEstimates } from './useEstimates';
import { useCallback } from 'react';


/**
 * 見積番号で取得する
 */
export const useEstimateById = (projEstimateId: string) => {

  return useEstimates(({
    select: useCallback((data) => {

      const foundData = data.find(({ uuid }) => uuid.value === projEstimateId);
      if (foundData) {
        return {
          record: foundData,
          calculated: calculateEstimateRecord(foundData),
        };
      }
    }, [projEstimateId]),
  }));

};
