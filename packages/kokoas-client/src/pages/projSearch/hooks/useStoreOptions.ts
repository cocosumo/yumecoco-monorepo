import { useStores } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { IStores } from 'types';

export const useStoreOptions = () => {
  return useStores(
    useCallback(
      (d: IStores[]) => {
        
        return d
          .filter(({ storeNameShort }) => !!storeNameShort.value)
          .map(({ storeNameShort, uuid, territory, sortNumber }) => ({
            label: storeNameShort.value,
            territory: territory.value,
            sortKey: +sortNumber.value,
            key: uuid.value,
          }))
          .sort((a) => {
            return a.territory === '西' ? -1 : 1;
          });
      }, 
      [],
    ),
  );
};