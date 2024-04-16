import { useQuery } from '@tanstack/react-query';
import { getOrderById } from 'api-kintone/src/order/getOrderById';
import { AppIds } from 'config';

export interface UseOrderByIdParams {
  orderId?: string
}

/**
 *  発注明細のデータを取得する 
 * */
export const useOrderById = ({
  orderId,
}: UseOrderByIdParams) => {

  return useQuery({
    queryKey: [AppIds.order, orderId],
    queryFn: async () => {
      if (orderId) {
        return getOrderById(orderId);
      }
    },
    enabled: !!orderId,
  });
};