import { calculateEstimateRecord } from 'api-kintone';
import { createPaymentList } from 'api-kintone/src/estimates/createPaymentList';

import { TEnvelopeStatus } from 'types';
import { useEstimates } from './useEstimates';

/**
 * 顧客グループ番号で契約済み見積もり一覧を取得する
 * @deprecated use useContractsByCustGroupIdV2 instead
 */
export const useContractsByCustGroupId = (
  custGroupId = '',
) => {

  return useEstimates(({
    select: (data) => {
      const filteredData = data
        .filter((rec) => rec.custGroupId.value === custGroupId
          && (rec.envStatus.value as TEnvelopeStatus) === 'completed');
      return {
        records: filteredData,
        calculated: filteredData.map((d) => calculateEstimateRecord({ record: d })),
        paymentList: filteredData.map((d) => createPaymentList(d)),
      };
    },
  }));
};