import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getAllMaterialsMid } from 'api-kintone';

/**
 * 中項目を取得する
 */
export const useMaterialsMid = <T>(
  options?: {
    select: (data: Awaited<ReturnType<typeof getAllMaterialsMid>>) => T
  }) => {
  return useQuery(
    [AppIds.materialsMid],
    getAllMaterialsMid,
    { ...options },
  );
};