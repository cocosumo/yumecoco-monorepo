import { useStores } from './useStores';

export const useStoreOptions = () => useStores<Options>(
  (d) => d?.map(({ $id, 店舗名, territory }) => ({
    value: $id?.value as string || '',
    label: 店舗名?.value as string || '',
    secondaryLabel: territory.value as string,
  })),
);
