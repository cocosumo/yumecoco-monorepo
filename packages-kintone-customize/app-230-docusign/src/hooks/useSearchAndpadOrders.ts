
import { ProjSearchFieldOption } from '../components/ProjSearchField';
import { useAndpadOrders } from './useAndpadOrders';

export const useSearchAndpadOrders = ({
  searchStr,
  enabled,
}: {
  searchStr: string,
  enabled?: boolean,
}) => {
  return useAndpadOrders({
    enabled,
    select: (result) => {
      const { data } = result;
      const options: ProjSearchFieldOption[] = data.objects
        .filter(({ 案件名, システムID }) => 案件名.includes(searchStr) || String(システムID).includes(searchStr))
        .map(
          ({
            システムID,
            案件名,
            案件フロー,
          }) => {
            return {
              label: 案件名,
              id: String(システムID),
              projStatus: 案件フロー ?? '',
            };
          },
        );
      return options;
    },

  });
};