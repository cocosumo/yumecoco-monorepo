
import { useProjTypes } from '.';
/**
 * 工事番号で、工事種別のデータを取得する。
 */
export const useProjTypeById = (projTypeId: string) => {


  return useProjTypes({
    select: (data) => data.find(({ uuid }) => uuid.value === projTypeId ),
  });

};