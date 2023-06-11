import { calculateEstimateRecord } from 'api-kintone';
import { useCallback } from 'react';
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
        calculated: filteredData.map((d) => calculateEstimateRecord({ record: d })),
      };
    }, [projId]),
  }));
};

export type UseEstimateByProjIdReturn = ReturnType<typeof useEstimatesByProjId>['data'];