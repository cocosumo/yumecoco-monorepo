import { useCallback } from 'react';
import { useInvoicesByCustGroupId } from './useInvoicesByCustGroupId';


export const useInvoiceTotalByCustGroupId = (
  custGroupId = '',
) => {
  return useInvoicesByCustGroupId(custGroupId, {
    select: useCallback((data) => {
      const totalInvoice = data.records.reduce((acc, cur) => {
        return +acc + +cur.billingAmount.value;
      }, 0);

      return {
        records: data.records,
        totalInvoice: totalInvoice,
      };
    }, []),
  });

};