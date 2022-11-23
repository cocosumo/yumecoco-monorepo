import { useQuery } from '@tanstack/react-query';
import { getAllEstimates } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllEstimates>>;

/**
 * 見積レコードを全て取得する
 */
export const useEstimates = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.projEstimates],
    () => getAllEstimates(),
    {
      ...options,
    },
  );
};