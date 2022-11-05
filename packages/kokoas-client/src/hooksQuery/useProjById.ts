import { AppIds } from 'config';
import { useQuery } from '@tanstack/react-query';

import { getProjById } from 'api-kintone';
/**
 * 工事番号で、工事のデータを取得する。
 */
export const useProjById = (projId: string) => {

  return useQuery(
    [AppIds.projects, projId],
    () => getProjById(projId),
    {
      enabled: !!projId,
    },
  );
};