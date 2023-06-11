import { calculateEstimateRecord } from 'api-kintone';
import { useCallback } from 'react';
import { useEstimates } from '.';

/**
 * 工事番号で見積リストを取得する
 */
export const useEstimatesByProjId = (
  projId = '',
  withDetails = false,
) => {

  return useEstimates(({
    select: useCallback((data) => {

      const filteredData = data
        .filter((rec) => rec.projId.value === projId);

      return {
        records: filteredData,
        calculated: filteredData
          .map((d) => calculateEstimateRecord({ 
            record: d, 
            withDetails,
          })),
      };
    }, [projId, withDetails]),
  }));
};


export type UseEstimateByProjIdReturn = NonNullable<ReturnType<typeof useEstimatesByProjId>['data']>;