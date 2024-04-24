import { useQuery } from '@tanstack/react-query';
import { getInvoiceB2BByProjId } from 'api-kintone/src/invoiceB2B/getInvoiceB2BByProjId';
import { AppIds } from 'config';
import { IInvoiceb2b } from 'types';

export interface UseInvoiceB2BByProjIdParams<T = IInvoiceb2b[]> {
  projId: string;
  select?: (data: IInvoiceb2b[]) => T;
}

export function useInvoiceB2BByProjId(params: UseInvoiceB2BByProjIdParams) {

  return useQuery({
    queryKey: [AppIds.invoiceB2B, params.projId],
    queryFn: () => getInvoiceB2BByProjId(params.projId),
    select: params.select,
  });
}