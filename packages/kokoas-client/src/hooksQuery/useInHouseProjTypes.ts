import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getInHouseProjTypes } from 'api-kintone';
import { IInhouseprojtypes } from 'types';

/**
 * 全工事種別の取得
 */
export const useInHouseProjTypes = <T = IInhouseprojtypes[]>(options?: {
  select: (data: IInhouseprojtypes[]) => T
}) => {
  return useQuery(
    [AppIds.inHouseProjTypes],
    getInHouseProjTypes,
    {
      ...options,
    },
  );
};