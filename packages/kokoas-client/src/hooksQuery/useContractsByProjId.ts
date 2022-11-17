import { useCallback } from 'react';
import { useEstimatesByProjId } from './useEstimatesByProjId';

/**
 * 工事番号で契約済み見積もり一覧を取得する
 */
export const useContractsByProjId = (
  projId = '',
) => {

  return useEstimatesByProjId(projId, {
    select: useCallback((data) => {
      const newRecords = data.records.filter(({ envStatus }) => {
        return envStatus.value;
      });
      const filterCalc = data.calculated.filter(({ recordId }) => {
        return newRecords.some(({ $id }) => recordId === $id.value);
      });

      return {
        records: newRecords,
        calculated: filterCalc,
      };
    }, []),
  });
};