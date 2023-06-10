import { useStoreOptions } from './useStoreOptions';

export const useStoreIds = (selectedStores: string[]) => {

  const { data: stores } = useStoreOptions();

  if (!stores) return [];

  return (selectedStores ?? []).map((storeAlias) => {
    const selectedStore = stores.find(({ label }) => label === storeAlias );
    return selectedStore?.key ?? '';
  });  
};