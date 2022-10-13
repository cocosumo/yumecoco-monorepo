import { useQuery } from 'react-query';
import { APPIDS, KintoneRecord } from '../api/kintone';

/**
 * 顧客グループ番号で、顧客グループのデータを取得する。
 * @param custGroupId 顧客グループ番号
 * @returns {CustomerGroupTypes.SavedData} 顧客グループ番号データ
 */
export const useCustGroupById = (custGroupId : string) => {
  return useQuery(
    [APPIDS.custGroup, custGroupId],
    () => {
      return KintoneRecord.getRecord({
        app: APPIDS.custGroup,
        id: custGroupId,
      }) as unknown as CustomerGroupTypes.SavedData;
    },
    {
      enabled: !!custGroupId,
    },
  );
};