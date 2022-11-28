import { useProjects } from './useProjects';
import { useMemo } from 'react';

/**
 * 工事番号で、工事のデータを取得する。
 */
export const useProjById = (projId: string) => {
  
  const queryInfo = useProjects();

  return {
    ...queryInfo,
    data: useMemo(
      () => queryInfo.data?.find(({ uuid }) => uuid.value === projId ),
      [queryInfo.data, projId],
    ),
  };

};