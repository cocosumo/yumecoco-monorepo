import { useCallback } from 'react';
import { useInvoicesByProjId } from './useInvoicesByProjId';

export const useInvoiceTotalByCustGroupId = (
  custGroupId = '',
) => {
  return useInvoicesByProjId(custGroupId, {
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