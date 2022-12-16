import { useCallback } from 'react';
import { useInvoicesByCustGroupId } from './useInvoicesByCustGroupId';

export interface EstimateList {
  dataId: string,
  billedAmount: string
}

export const useInvoiceTotalByCustGroupId = (
  custGroupId = '',
) => {
  return useInvoicesByCustGroupId(custGroupId, {
    select: useCallback((data) => {

      // 見積もり(契約)毎の請求済み金額を取り出す処理
      const totalInvoice = data.records.reduce((acc, cur) => {
        const estimateList = cur.estimateLists.value;

        estimateList.forEach((estimate) => {
          acc.push({
            dataId: estimate.value.dataId.value,
            billedAmount: estimate.value.amountPerContract.value,
          });
        });
        
        return acc;

      }, [] as EstimateList[]);


      return {
        records: data.records,
        totalInvoice: totalInvoice,
      };
    }, []),
  });

};