import { useQuery } from '@tanstack/react-query';
import { getAllContracts } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllContracts>>;

/**
 * 契約を全て取得する
 */
export const useAllContracts = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.contracts],
    () => getAllContracts(),
    {
      ...options,
    },
  );
};