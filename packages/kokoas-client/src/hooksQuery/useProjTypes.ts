import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getProjTypes } from 'api-kintone';
import { IProjtypes } from 'types';

/**
 * 全工事種別の取得
 */
export const useProjTypes = <T = IProjtypes[]>(options?: {
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