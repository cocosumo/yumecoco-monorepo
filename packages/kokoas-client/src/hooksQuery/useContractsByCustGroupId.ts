import { calculateEstimateRecord } from 'api-kintone';
import { createPaymentList } from 'api-kintone/src/estimates/createPaymentList';

import { TEnvelopeStatus } from 'types';
import { useEstimates } from './useEstimates';
import { filteredPaymentList } from 'api-kintone/src/invoice/filteredPaymentList';

/**
 * 顧客グループ番号で契約済み見積もり一覧を取得する
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
        availablePaymentList: filteredData.map((d) => filteredPaymentList(d)),
      };
    },
  }));
};