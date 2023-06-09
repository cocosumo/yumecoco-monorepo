import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useStoreOptions } from './useStoreOptions';

/**
 * 選択された店舗のIDを取得する
 */
export const useSelectStoresId = () => {
  
  const selectedStores = useWatch<TypeOfForm>({ 
    name: 'stores', 
  }) as string[] | null;

  const { data: stores } = useStoreOptions();

  if (!stores) return [];

  return (selectedStores ?? []).map((storeAlias) => {
    const selectedStore = stores.find(({ label }) => label === storeAlias );
    return selectedStore?.key ?? '';
  });  

};