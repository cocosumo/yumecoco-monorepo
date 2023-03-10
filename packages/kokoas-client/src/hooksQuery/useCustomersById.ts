import { useCustomers } from './useCustomers';

/**
 * 顧客番号で、顧客のデータを取得する。
 *
 * データ関連：
 * custGroup n-n customer
 */
export const useCustomersById = (
  custId: string | undefined,
) => {
  return useCustomers({
    select: (data) => data.find(({ uuid }) => uuid.value === custId ),
    enabled: !!custId,
  });
};