import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getCustGroupById } from '../api/kintone/custgroups/getCustGroupById';

/**
 * 顧客グループ番号で、顧客グループのデータを取得する。
 * @param custGroupId 顧客グループ番号
 * @returns {CustomerGroupTypes.SavedData} 顧客グループ番号データ
 */
export const useCustGroupById = (custGroupId : string) => {
  return useQuery(
    [APPIDS.custGroup, custGroupId],
    () => getCustGroupById(custGroupId),
    {
      enabled: !!custGroupId,
    },
  );
};