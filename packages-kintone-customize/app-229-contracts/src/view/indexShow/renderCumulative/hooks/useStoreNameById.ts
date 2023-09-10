import { useStores } from './useStores';

export const useStoreNameById = (id: string) => {
  const { data } = useStores();

  const store = data?.find((s) => s.uuid.value === id);

  return store?.storeNameShort.value;

};