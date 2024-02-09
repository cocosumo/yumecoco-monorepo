import { useQuery } from '@tanstack/react-query';
import { getAllUnissuedInvoiceAlerts } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllUnissuedInvoiceAlerts>>;

/**
 * 契約を全て取得する
 */
export const useAllUnissuedInvoiceAlerts = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.contracts],
    () => getAllUnissuedInvoiceAlerts(),
    {
      ...options,
    },
  );
};
