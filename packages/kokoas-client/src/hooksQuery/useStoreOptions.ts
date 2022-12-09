import { Territory } from 'types';
import { useStores } from './useStores';



export const useStoreOptions = (filter?: {
  territory?: Territory | ''
} ) => useStores<Options>(
  (d) => d
    ?.filter((rec) => {
      if (filter) {
        return !filter.territory || rec.territory.value === filter.territory;
      }

      return true;
    })
    ?.map(({ uuid, 店舗名, territory }) => ({
      value: uuid?.value as string || '',
      label: 店舗名?.value as string || '',
      secondaryLabel: territory.value,
      hiddenValue: territory.value as string,
    })),
);
