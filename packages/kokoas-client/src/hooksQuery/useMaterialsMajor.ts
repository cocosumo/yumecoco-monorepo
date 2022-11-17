import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { AwaitedGetAllMaterialsMajor, getAllMaterialsMajor } from 'api-kintone';

/**
 * 大項目を取得する
 */
export const useMaterialsMajor = <T = AwaitedGetAllMaterialsMajor>(
  options?: {
    select: (data: AwaitedGetAllMaterialsMajor) => T
  }) => useQuery(
    [AppIds.materialsMajor],
    getAllMaterialsMajor,
    { ...options },
  );
