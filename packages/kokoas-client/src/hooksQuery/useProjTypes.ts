import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getProjTypes } from 'api-kintone';
import { IProjtypes } from 'types';

/**
 * Retrieves all active employee records
 * 全社員レコードを取得する
 *
 */
export const useProjTypes = <T>(options?: {
  select: (data: IProjtypes[]) =>  T
}) => {
  return useQuery(
    [AppIds.projTypes],
    getProjTypes,
    {
      ...options,
    },
  );
};