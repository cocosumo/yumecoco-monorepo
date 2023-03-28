import { useQuery } from '@tanstack/react-query';
import { getOrderByProjId } from 'api-andpad';
import { AppIds } from 'config';

/**
 * Andpadから案件データを取得する
 */
export const useAndpadOrderByProjId = (projId: string, {
  enable = false,
} : {
  enable: boolean,
}) => {
  return useQuery(
    [AppIds.projects, 'andpad', projId],
    () => getOrderByProjId(projId),
    {
      enabled: enable && !!projId,
    },
  );
};