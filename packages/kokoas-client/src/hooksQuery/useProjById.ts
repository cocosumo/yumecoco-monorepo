import { useProjects } from './useProjects';
import { useCallback } from 'react';

/**
 * 工事番号で、工事のデータを取得する。
 */
export const useProjById = (projId: string) => {

  return useProjects(({
    select: useCallback(
      (data) => data.find(({ uuid }) => uuid.value === projId ),
      [projId],
    ),
  }));

};