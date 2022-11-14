import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { searchProjects } from 'api-kintone';
import { IProjects } from 'types';


/**
 * 見積番号で取得する
 */
export const useSearchProjects = <T = unknown>(
  searchTerm: string,
  params?: {
    select: (data: IProjects[]) => T
  },
) => {

  return useQuery(
    [AppIds.projects, { searchTerm }],
    () => searchProjects(searchTerm),
    {
      enabled: !!searchTerm,
      ...params,
    },
  );
};
