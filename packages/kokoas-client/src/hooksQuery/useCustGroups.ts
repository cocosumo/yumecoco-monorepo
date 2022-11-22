import { useQuery } from '@tanstack/react-query';
import { getAllCustGroups } from 'api-kintone';
import { AppIds } from 'config';

/**
 * 顧客グループを全て取得する
 */
export const useCustGroups = <T = Awaited<ReturnType<typeof getAllCustGroups>>>(options?: {
  select: (data: Awaited<ReturnType<typeof getAllCustGroups>>) => T
}) => {
  return useQuery(
    [AppIds.custGroups],
    () => getAllCustGroups(),
    {
      ...options,
    },
  );
};