import { useQuery } from '@tanstack/react-query';
import { getCustGroupById } from 'api-kintone';
import { AppIds } from 'config';

/**
 * 顧客グループ番号で、顧客グループのデータを取得する。
 */
export const useCustGroupById = (custGroupId : string) => {
  return useQuery(
    [AppIds.custGroups, { custGroupId }],
    () => getCustGroupById(custGroupId),
    {
      enabled: !!custGroupId,
    },
  );
};