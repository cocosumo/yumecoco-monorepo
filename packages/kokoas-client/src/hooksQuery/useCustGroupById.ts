
import { useCustGroups } from './useCustGroups';

/**
 * 顧客グループ番号で、顧客グループのデータを取得する。
 */
export const useCustGroupById = (custGroupId : string) => {
  return useCustGroups({
    enabled: !!custGroupId,
    select: (data) => data.find(({ $id }) => $id.value === custGroupId),
  });
};