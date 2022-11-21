import { useQuery } from '@tanstack/react-query';
import { getInvoiceByProjId } from 'api-kintone/src/invoice/getInvoiceByProjId';
import { AppIds } from 'config';

export const useInvoicesByProjId = <T>(
  projId = '',
  options?: { select: (data:Awaited<ReturnType<typeof getInvoiceByProjId>>) => T },
) => {

  return useQuery(
    [AppIds.invoices, { projId }],
    () => getInvoiceByProjId(projId),
    {
      enabled: !!projId,
      ...options,
    },
  );
};