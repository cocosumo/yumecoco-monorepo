import { useStores } from 'kokoas-client/src/hooksQuery';

export const useStoreIds = (selectedStores: string[]) => {

  return useStores((data) => {
    return data?.reduce((acc, curr) => {
      const { uuid, storeNameShort } = curr;
      if (!selectedStores.includes(storeNameShort.value)) return acc;
      
      acc.push(uuid.value);
      return acc;
    }, [] as string[]);
  });

};