import { useQuery } from '@tanstack/react-query';
import { getAllAndpadOrders } from '../cachedApi/getAllAndpadOrders';
import { GetMyOrdersResponse } from 'api-andpad';

export const useAndpadOrders = <T>({
  enabled,
  select,
}: {
  enabled?: boolean,
  select?: (data: GetMyOrdersResponse) => T,
}) => {
  return useQuery( 
    ['searchAndpadOrders'],
    () => getAllAndpadOrders(),
    {
      enabled,
      select,
    },
  );

};