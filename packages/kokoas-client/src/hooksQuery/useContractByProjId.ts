
import { calculateEstimateRecord, CalculateEstimateRecordReturn } from 'api-kintone';
import { useCallback } from 'react';
import { IProjestimates, TEnvelopeStatus } from 'types';
import { useEstimates } from './useEstimates';

/**
 * 工事番号で主な契約を取得する
 *
 * 主な契約とは、もっとも高い契約金額をさします。
 * @deprecated 契約DBは見積もりから独立になり、このフックは廃止されます。
 */
export const useContractByProjId = (
  projId = '',
) => {

  return useEstimates(({
    select: useCallback((data) => {
      let mainContract: {
        record: IProjestimates;
        calculated: CalculateEstimateRecordReturn;
      } | undefined;

      for (const estimate of data) {
        if (estimate.projId.value !== projId) {
          continue;
        }

        const envStatus = estimate.envStatus?.value as TEnvelopeStatus;
        if (envStatus !== 'completed') {
          continue;
        }

        const calculated = calculateEstimateRecord({ record: estimate });
        if (!mainContract || calculated.summary.totalAmountAfterTax > mainContract.calculated.summary.totalAmountAfterTax) {
          mainContract = {
            record: estimate,
            calculated,
          };
        }
      }

      return mainContract;
    }, [projId]),
  }));
};