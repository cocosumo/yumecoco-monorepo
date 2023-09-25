import { useMemo } from 'react';
import { useContractsResult } from './useContractsResult';

export const useContractsResultGroupedByStore = () => {
  const {
    data,
    ...others
  } = useContractsResult();

  const groupedByStore = useMemo(
    () => data?.reduce((acc, cur) => {

      const {
        storeName,
      } = cur;

      const storeNameVal = storeName?.value;

      if (acc[storeNameVal]) {
        acc[storeNameVal].push(cur);
      } else {
        acc[storeNameVal] = [cur];
      }

      return acc;
    }, 
    {} as Record<string, DB.SavedRecord[]>),
    [
      data,
    ],
  );

  return {
    data: groupedByStore,
    ...others,
  };
};