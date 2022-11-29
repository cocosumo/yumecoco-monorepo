import { calculateEstimateRecord } from 'api-kintone';

import { TEnvelopeStatus } from 'types';
import { useEstimates } from './useEstimates';

/**
 * 工事番号で契約済み見積もり一覧を取得する
 */
export const useContractsByProjId = (
  projId = '',
) => {

  return useEstimates(({
    select: (data) => {
      const filteredData = data
        .filter((rec) => rec.projId.value === projId
          && (rec.envStatus.value as TEnvelopeStatus) === 'completed');
      return {
        records: filteredData,
        calculated: filteredData.map((d) => calculateEstimateRecord(d)),
      };
    },
  }));
};