
import { calculateEstimateRecord } from 'api-kintone';
import { TEnvelopeStatus } from 'types';
import { useEstimates } from './useEstimates';

/**
 * 工事番号で契約済み見積もり一覧を取得する
 * @deprecated 契約DBは見積もりから独立になり、このフックは廃止されます。useContractsByProjIdV2ご利用くだご利用ください。
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
        calculated: filteredData.map((rec) => calculateEstimateRecord({ record: rec })),
      };
    },
  }));
};