import { useCallback } from 'react';
import { calculateEstimateRecord } from 'api-kintone';
import { useEstimates } from '.';

/**
 * 工事番号で見積リストを取得する
 */
export const useEstimatesByProjId = (
  projId = '',
) => {

  return useEstimates(({
    select: useCallback((data) => {

      const filteredData = data
        .filter((rec) => rec.projId.value === projId);

      return {
        records: filteredData,
        calculated: filteredData.map((d) => calculateEstimateRecord(d)),
      };
    }, [projId]),
  }));
};