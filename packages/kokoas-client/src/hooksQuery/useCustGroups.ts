import { useQuery } from '@tanstack/react-query';
import { getAllCustGroups } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllCustGroups>>;

/**
 * 顧客グループを全て取得する
 */
export const useCustGroups = <T = DefaultResult>(options?: {
  select?: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.custGroups],
    () => getAllCustGroups(),
    {
      ...options,
    },
  );
};