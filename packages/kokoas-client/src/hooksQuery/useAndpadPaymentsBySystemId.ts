import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getAndpadPaymentsBySystemId } from 'api-kintone';


interface QueryOptions {
  enabled?: boolean,
}

/**
 * Andpadから入金データを取得する
 */
export const useAndpadPaymentsBySystemId = (
  systemId: string | number,
  options?: QueryOptions,
) => {

  const {
    enabled = true,
  } = options || {};

  return useQuery(
    [AppIds.andpadPayments, 'andpad', systemId],
    () => getAndpadPaymentsBySystemId(systemId),
    {
      enabled: enabled && !!systemId,
      staleTime: 10000,
    },
  );
};