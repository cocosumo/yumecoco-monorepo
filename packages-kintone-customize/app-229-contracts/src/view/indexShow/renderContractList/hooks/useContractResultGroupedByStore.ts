import { useMemo } from 'react';
import { useContractsResult } from './useContractsResult';

export const companyPropertyField = '自社物件';


export const useContractsResultGroupedByStore = () => {
  const {
    data,
    ...others
  } = useContractsResult();

  const groupedByStore = useMemo(
    () => data?.reduce((acc, cur) => {

      const {
        storeName,
        自社物件,
      } = cur;

      const isCompanyProperty = 自社物件?.value.includes(companyPropertyField);

      const storeNameVal = storeName?.value;

      if (isCompanyProperty) {
        // 自社物件の場合
        if (acc[companyPropertyField]) {
          acc[companyPropertyField].push(cur);
        } else {
          acc[companyPropertyField] = [cur];
        }
      } else {
        if (acc[storeNameVal]) {
          acc[storeNameVal].push(cur);
        } else {
          acc[storeNameVal] = [cur];
        }
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
    rawData: data,
    ...others,
  };
};