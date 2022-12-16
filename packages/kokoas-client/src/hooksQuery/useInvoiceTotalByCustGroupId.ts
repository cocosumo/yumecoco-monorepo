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
          const newDateId = estimate.value.dataId.value;

          if (typeof acc[newDateId] === 'undefined') {
            acc[newDateId] = {
              dataId: newDateId,
              billedAmount: newBilledAmount,
            };
          } else {
            acc[newDateId] = {
              ...acc[newDateId],
              billedAmount: String(+acc[newDateId].billedAmount + +newBilledAmount),
            };
          }
        });

        return acc;

      }, {} as Record<string, EstimateList>);


      return Object.values(totalInvoice);
    }, []),
  });

};