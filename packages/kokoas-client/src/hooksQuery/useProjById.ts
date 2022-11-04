import { APPIDS } from '../api/kintone';
import { useQuery } from '@tanstack/react-query';

import { getProjById } from 'api-kintone';
/**
 * 工事番号で、工事のデータを取得する。
 */
export const useProjById = (projId: string) => {

  return useQuery(
    [APPIDS.project, projId],
    () => getProjById(projId),
    {
      enabled: !!projId,
    },
  );
};