import { useCustomers } from './useCustomers';

/**
 * 顧客番号の配列で、顧客のデータの配列を取得する。
 *
 * データ関連：
 * custGroup n-n customer
 */
export const useCustomersByIds = (
  custIds: string[] | undefined = [],
) => {
  return useCustomers({
    select: (data) => data.filter(({ uuid }) => custIds.includes(uuid.value) ),
  });
};