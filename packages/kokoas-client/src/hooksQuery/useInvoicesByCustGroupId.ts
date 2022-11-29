import { useQuery } from '@tanstack/react-query';
import { getInvoiceByProjId } from 'api-kintone';
import { getInvoiceByCustGroupId } from 'api-kintone/src/invoice/getInvoiceByCustGroupId';
import { AppIds } from 'config';

export const useInvoicesByCustGroupId = <T>(
  custGroupId = '',
  options?: { select: (data:Awaited<ReturnType<typeof getInvoiceByProjId>>) => T },
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