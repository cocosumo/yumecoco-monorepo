import { useCallback } from 'react';
import { TInvoiceStatus } from '../pages/projInvoice/form';
import { useInvoicesByCustGroupId } from './useInvoicesByCustGroupId';

export interface EstimateList {
  dataId: string,
  billedAmount: number,
  createdAmount: number,
}

export const useInvoiceTotalByCustGroupId = (
  custGroupId = '',
) => {
  return useInvoicesByCustGroupId(custGroupId, {
    select: useCallback((data) => {

      // 見積もり(契約)毎の請求済み金額を取り出す処理
      const totalInvoice = data.records.reduce((acc, cur) => {
        const estimateList = cur.estimateLists.value;
        const invoiceStatus = cur.invoiceStatus.value as TInvoiceStatus;

        if (invoiceStatus !== 'voided') {

          estimateList.forEach((estimate) => {
            const isBilled = invoiceStatus === 'sent' || invoiceStatus === 'completed';
            const newBilledAmount = isBilled ? +estimate.value.amountPerContract.value : 0;
            const newCreatedAmount = +estimate.value.amountPerContract.value;
            const newDataId = estimate.value.dataId.value;

            if (typeof acc[newDataId] === 'undefined') {
              acc[newDataId] = {
                dataId: newDataId,
                billedAmount: newBilledAmount,
                createdAmount: newCreatedAmount,
              };
            } else {
              acc[newDataId] = {
                ...acc[newDataId],
                billedAmount: +acc[newDataId].billedAmount + +newBilledAmount,                
                createdAmount: +acc[newDataId].createdAmount + newCreatedAmount,
              };
            }
          });

        }
        return acc;

      }, {} as Record<string, EstimateList>);


      return Object.values(totalInvoice);
    }, []),
  });

};