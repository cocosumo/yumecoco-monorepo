import { useQuery } from '@tanstack/react-query';
import { searchAndpadOrders } from '../cachedApi/searchAndpadOrders';
import type { AutoCompleteOption } from '../../types/types';

export const useSearchAndpadOrders = ({
  searchStr,
  enabled,
}: {
  searchStr: string,
  enabled?: boolean,
}) => {
  return useQuery( 
    ['searchAndpadOrders', searchStr],
    () => searchAndpadOrders(searchStr),
    {
      enabled,
      select: (data) => data.data.objects.map<AutoCompleteOption>((order) => ({
        label: order.案件名,
        id: String(order.システムID),
      })),
    },
  );

};