import { useCallback } from 'react';

import { useCustGroups } from './useCustGroups';

/**
 * 顧客グループ番号で、顧客グループのデータを取得する。
 */
export const useCustGroupById = (
  custGroupId : string,
  enabled = true,
) => {

  return useCustGroups({
    enabled: enabled && !!custGroupId,
    select: useCallback((data) => {
      return data.find(({ uuid }) => uuid.value === custGroupId);
    }, [custGroupId]),
  });
};