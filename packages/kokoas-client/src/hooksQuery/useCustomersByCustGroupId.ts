import { useMemo } from 'react';
import { useCustGroupById } from './useCustGroupById';
import { useCustomersByIds } from './useCustomersByIds';

/**
 * 顧客グループ番号で顧客データを取得する。
 *
 * custGroup n-n customers
 */
export const useCustomersByCustGroupId = (custGroupId?: string) => {
  const { data: custGroupRecord } = useCustGroupById(custGroupId ?? '');

  const custIds = useMemo(
    () => custGroupRecord?.members.value.map((m) => m.value.custId.value),
    [custGroupRecord],
  );

  return useCustomersByIds(custIds);
};