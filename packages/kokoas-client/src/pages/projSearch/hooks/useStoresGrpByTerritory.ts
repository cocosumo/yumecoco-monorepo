import { useStores } from 'kokoas-client/src/hooksQuery';
import { Territory } from 'types';

export const useStoresGrpByTerritory = () => {
  return useStores((s) => {
    return s.reduce(
      (acc, cur) => {
        const {
          territory,
          storeNameShort,
        } = cur;
        if (!storeNameShort.value) return acc;

        const resolvedTerritory = territory.value as Territory;

        if (!acc[resolvedTerritory]) {
          acc[resolvedTerritory] = [];
        }
        acc[resolvedTerritory].push(storeNameShort.value);
        return acc;
      }, 
      {} as Record<Territory, string[]>,
    );
  });
};