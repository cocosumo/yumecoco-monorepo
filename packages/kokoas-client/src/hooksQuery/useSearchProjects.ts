import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { searchProjects } from 'api-kintone';
import { IProjects } from 'types';


/**
 * 見積番号で取得する
 */
export const useSearchProjects = <T = unknown>(
  searchTerm: string,
  options?: {
    enabled?: boolean,
    select: (data: IProjects[]) => T
  },
) => {
  
  const {
    enabled = true,
    ...otherOptions
  } = options || {}; 
  
  return useQuery(
    [AppIds.projects, { searchTerm }],
    () => searchProjects(searchTerm),
    {
      enabled: enabled && !!searchTerm,
      ...otherOptions,
    },
  );
};
