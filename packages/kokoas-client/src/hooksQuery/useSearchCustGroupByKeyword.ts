import { ICustgroups } from 'types';
import { AppIds } from 'config';
import { searchCustGroupByKeyword } from 'api-kintone/src/custgroups/searchCustGroupByKeyword';
import { useQuery } from '@tanstack/react-query';

/**
 * A custom hook to search customer groups by keyword.
 * @param keyword - The keyword to search for.
 * @param options - Additional options for the hook.
 * @template T - The type of data to select.
 */
export const useSearchCustGroupByKeyword = <T = unknown>({
  keyword,
  options,
}:{
  keyword: string,
  options?: {
    select: (data: ICustgroups[]) => T
    enabled?: boolean
  },
}) => {

  const {
    enabled = true,
    ...otherOptions
  } = options || {}; 

  return useQuery(
    [AppIds.custGroups, 'keyword', keyword],
    () => searchCustGroupByKeyword({ keyword }),
    {
      enabled: enabled,
      ...otherOptions,
    },
  );

};