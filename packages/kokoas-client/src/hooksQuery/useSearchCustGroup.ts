import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { searchCustGroups } from 'api-kintone';
import { ICustgroups } from 'types';



/**
 * 顧客グループを取得する
 * @deprecated この関数は廃止予定です。代わりに useSearchCustGroupByKeyword を使用してください。
 */
export const useSearchCustGroup = <T = unknown>(
  search: Parameters<typeof searchCustGroups>[0],
  options?: {
    select: (data: ICustgroups[]) => T
    enabled?: boolean
  },
) => {

  const {
    enabled = true,
    ...otherOptions
  } = options || {}; 

  const definedSearch = Object.values(search).some(Boolean);

  return useQuery(
    [AppIds.custGroups, search],
    () => searchCustGroups(search),
    {
      enabled: enabled && !!definedSearch,
      ...otherOptions,
    },
  );
};
