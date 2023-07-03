import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getOrderByProjId } from '../api/andpad/getOrderByProjId';


interface QueryOptions {
  onError?: (error: Error) => void,
  enabled?: boolean,
}

/**
 * Andpadから案件データを取得する
 */
export const useAndpadOrderByProjId = (
  projId: string,
  options?: QueryOptions,
) => {

  const {
    onError,
    enabled = true,
  } = options || {};

  return useQuery(
    [AppIds.projects, 'andpad', projId],
    () => getOrderByProjId(projId),
    {
      enabled: !!projId || enabled,
      staleTime: 5000,
      onError,
    },
  );
};