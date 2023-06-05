import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getOrderByProjId } from '../api/andpad/getOrderByProjId';


interface QueryOptions {
  onError?: (error: Error) => void,
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
  } = options || {};

  return useQuery(
    [AppIds.projects, 'andpad', projId],
    () => getOrderByProjId(projId),
    {
      enabled: !!projId,
      staleTime: 5000,
      onError,
    },
  );
};