import { useAllInvoiceB2B } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { KeyOfSearchResult, SearchResult } from '../types';
import { KInvoiceProgress } from 'types/src/common/order';
import { useSuppliersMap } from './useSuppliersMap';
import { parseISOTimeToFormat, toKintoneDateStr } from 'kokoas-client/src/lib';
import { useParsedQuery } from './useParsedQuery';
import { KInvoiceb2b } from 'types';

const invoiceDueDateKey: KInvoiceb2b = 'invoiceDueDate';

export const useSearchResult = () => {

  const parsedQuery = useParsedQuery();

  const {
    invoiceDateFrom,
    invoiceDateTo,
    projName,
    order,
    orderBy,
  } = parsedQuery;

  const parsedOrderBy = orderBy as KeyOfSearchResult;


  const {
    data: suppliersMap,
  } = useSuppliersMap();

  // 処理の最適化のため、kintoneに任せられる条件をここで絞る
  const queryConditions: string[] = [];

  if (invoiceDateFrom) {
    queryConditions.push(`${invoiceDueDateKey} >= "${toKintoneDateStr(invoiceDateFrom)}"`);
  }
  if (invoiceDateTo) {
    queryConditions.push(`${invoiceDueDateKey} <= "${toKintoneDateStr(invoiceDateTo)}"`);
  }

  return useAllInvoiceB2B({
    condition: queryConditions.join(' and '),
    select: useMemo(() => (data) => {
    
      if (!suppliersMap 
        || !data
      ) return [];
    
      return data
        .reduce<SearchResult[]>((acc, d) => {
        const parsedInvoiceStatus = d.invoiceStatus.value as KInvoiceProgress;
        const supplier = suppliersMap?.[d.supplierId.value];

        const isMatchProjName = !projName || d.projName.value.includes(projName);

        if (!parsedQuery 
        || isMatchProjName
        ) {
          acc.push({
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
  
        }

   
        return acc;
      }, 
      [])
        .sort((a, b) => {
          switch (parsedOrderBy) {
            case 'orderAmount':
            case 'paymentAmount':
              return order === 'asc' ? a[parsedOrderBy] - b[parsedOrderBy] : b[parsedOrderBy] - a[parsedOrderBy];
            case 'invoiceDate':
            case 'createdAt':
            case 'updatedAt':
              return order === 'asc' ? new Date(a[parsedOrderBy]).getTime() - new Date(b[parsedOrderBy]).getTime() : new Date(b[parsedOrderBy]).getTime() - new Date(a[parsedOrderBy]).getTime();
            default:
              return 0;
          }
        });

    }, [
      suppliersMap,
      order,
      parsedOrderBy,
      projName,
      parsedQuery,
    ]),
  });



};