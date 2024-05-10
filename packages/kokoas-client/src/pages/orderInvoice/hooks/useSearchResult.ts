import { useAllInvoiceB2B } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { SearchResult } from '../types';
import { KInvoiceProgress } from 'types/src/common/order';
import { useSuppliersMap } from './useSuppliersMap';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';

export const useSearchResult = () => {

  const {
    data: suppliersMap,
  } = useSuppliersMap();

  return useAllInvoiceB2B({
    select: useMemo(() => (data) => {

      if (!suppliersMap 
        || !data
      ) return [];
    
      return data
        .map<SearchResult>((d) => {

        const parsedInvoiceStatus = d.invoiceStatus.value as KInvoiceProgress;
        const supplier = suppliersMap?.[d.supplierId.value];

        return ({
          invoiceId: d.uuid.value,
          invoiceStatus: parsedInvoiceStatus,
          projName: d.projName.value,
          storeName: d.storeName.value,
          cocoAgName: d.cocoAG.value || '-',
          supplierName: supplier?.supplierName || '-',
          invoiceSystemNumber: supplier?.invoiceSystemNumber || '-',
          orderAmount: Number(d.orderAmount.value),
          paymentAmount: Number(d.invoiceAmount.value),
          invoiceDate: d.invoiceDueDate.value,
          createdAt: parseISOTimeToFormat(d.作成日時.value),
          updatedAt: parseISOTimeToFormat(d.更新日時.value),
          
        });
      });

    }, [suppliersMap]),
  });



};