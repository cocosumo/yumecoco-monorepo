import { useQuery } from '@tanstack/react-query';
import { getInvoiceB2BByProjId } from 'api-kintone/src/invoiceB2B/getInvoiceB2BByProjId';
import { AppIds } from 'config';

export interface UseInvoiceB2BByProjIdParams<T> {
  projId: string;
  select?: (data: UseInvoiceB2BByProjIdReturn) => T;
}

export function useInvoiceB2BByProjId<T = UseInvoiceB2BByProjIdReturn>(params: UseInvoiceB2BByProjIdParams<T>) {

  return useQuery({
    queryKey: [AppIds.invoiceB2B, params.projId],
    queryFn: () => getInvoiceB2BByProjId(params.projId),
    select: params.select,
  });
}

export type UseInvoiceB2BByProjIdReturn = Awaited<ReturnType<typeof getInvoiceB2BByProjId>>;
