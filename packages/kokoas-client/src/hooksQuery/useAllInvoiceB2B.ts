import { useQuery } from '@tanstack/react-query';
import { getAllInvoiceB2B, GetAllInvoiceB2BParams } from 'api-kintone/src/invoiceB2B/getAllInvoiceB2B';
import { AppIds } from 'config';
import { IInvoiceb2b } from 'types';


export type UseAllInvoiceParams<T = IInvoiceb2b> = GetAllInvoiceB2BParams & {
  select?: (data: IInvoiceb2b[]) => T[];
};

/**
 * 請求書を全て取得する
 *  
 */
export const useAllInvoiceB2B = <T = IInvoiceb2b>(params?: UseAllInvoiceParams<T>) => {

  return useQuery({
    queryKey: [AppIds.invoiceB2B, params],
    queryFn: () => getAllInvoiceB2B(params),
    select: params?.select,
  });
};