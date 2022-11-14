import { AppIds } from 'config';
import { useQuery } from '@tanstack/react-query';

import { getProjTypeById } from 'api-kintone';
/**
 * 工事番号で、工事のデータを取得する。
 */
export const useProjTypeById = (id: string) => {

  return useQuery(
    [AppIds.projTypes, id],
    () => getProjTypeById(id),
    {
      enabled: !!id,
    },
  );
};