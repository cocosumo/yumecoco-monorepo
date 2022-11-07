import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getCustGroupById } from 'api-kintone';

/**
 * 顧客グループ番号で、顧客グループのデータを取得する。
 */
export const useCustGroupById = (custGroupId : string) => {
  return useQuery(
    [APPIDS.custGroup, { custGroupId }],
    () => getCustGroupById(custGroupId),
    {
      enabled: !!custGroupId,
    },
  );
};