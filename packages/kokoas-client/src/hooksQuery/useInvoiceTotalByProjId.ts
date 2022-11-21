import { useCallback } from 'react';
import { useInvoicesByProjId } from './useInvoicesByProjId';

export const useInvoiceTotalByProjId = (
  projId = '',
) => {
  return useInvoicesByProjId(projId, {
    select: useCallback((data) => {
      const totalInvoice = data.reduce((acc, cur) => {
        return +acc + +cur.billingAmount.value;
      }, 0);

      return {
        records: data,
        totalInvoice: totalInvoice,
      };
    }, []),
  });

};