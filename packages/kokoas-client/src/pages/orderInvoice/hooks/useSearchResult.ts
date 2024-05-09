import { useAllInvoiceB2B } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { SearchResult } from '../types';
import { KInvoiceProgress } from 'types/src/common/order';

export const useSearchResult = () => {
  return useAllInvoiceB2B({
    select: useMemo(() => (data) => {
    

      return data
        .map<SearchResult>((d) => {

        const parsedInvoiceStatus = d.invoiceStatus.value as KInvoiceProgress;
          
        return ({
          invoiceId: d.uuid.value,
          invoiceStatus: parsedInvoiceStatus,
          projName: d.projName.value,
          storeName: d.storeName.value,
          cocoAgName: d.cocoAG.value || '-',
          supplierName: d.supplierName.value || '-',
          invoiceSystemNumber: d.businessNumber.value || '-',
          orderAmount: Number(d.orderAmount.value),
          paymentAmount: Number(d.invoiceAmount.value),
          invoiceDate: d.invoiceDueDate.value,
          createdAt: d.作成日時.value,
          updatedAt: d.更新日時.value,
          
        });
      });

    }, []),
  });



};