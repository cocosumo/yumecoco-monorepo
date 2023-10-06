import { useStores } from 'kokoas-client/src/hooksQuery';

export const useStoreById = (storeId: string) => {
  return useStores((data) => data.find(({ uuid }) => uuid.value === storeId));
};