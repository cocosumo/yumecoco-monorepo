import { useQuery } from '@tanstack/react-query';
import { searchAndpadOrders } from '../cachedApi/searchAndpadOrders';
import { ProjSearchFieldOption } from '../components/ProjSearchField';

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
      select: (data) => {
        console.log('data', data);
        return data.data.objects.map<ProjSearchFieldOption>(({
          案件名,
          システムID,
          案件フロー,
        }) => {

          return {
            label: 案件名,
            id: String(システムID),
            projStatus: 案件フロー ?? '',
      
          };
        });
      },
    },
  );

};