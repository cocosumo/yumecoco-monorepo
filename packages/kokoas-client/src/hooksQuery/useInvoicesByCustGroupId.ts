import { useQuery } from '@tanstack/react-query';
import { getInvoiceByCustGroupId } from 'api-kintone/src/invoice/getInvoiceByCustGroupId';
import { AppIds } from 'config';

export type GetInvoicesByCustGroupId = Awaited<ReturnType<typeof getInvoiceByCustGroupId>>;

export const useInvoicesByCustGroupId = <T = GetInvoicesByCustGroupId>(
  custGroupId = '',
  options?: { select: (data: GetInvoicesByCustGroupId) => T },
) => {

  return useQuery(
    [AppIds.invoices, { custGroupId }],
    () => getInvoiceByCustGroupId(custGroupId),
    {
      enabled: !!custGroupId,
      ...options,
    },
  );
};