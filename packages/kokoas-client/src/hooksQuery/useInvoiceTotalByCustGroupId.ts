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
          const newBilledAmount = estimate.value.amountPerContract.value;
          const newDataId = estimate.value.dataId.value;

          if (typeof acc[newDataId] === 'undefined') {
            acc[newDataId] = {
              dataId: newDataId,
              billedAmount: newBilledAmount,
            };
          } else {
            acc[newDataId] = {
              ...acc[newDataId],
              billedAmount: String(+acc[newDataId].billedAmount + +newBilledAmount),
            };
          }
        });

        return acc;

      }, {} as Record<string, EstimateList>);


      return Object.values(totalInvoice);
    }, []),
  });

};