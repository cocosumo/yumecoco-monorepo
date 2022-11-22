import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllCustomers>>;

/**
 * 顧客グループを全て取得する
 */
export const useCustomers = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select?: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.customers],
    () => getAllCustomers(),
    {
      ...options,
    },
  );
};