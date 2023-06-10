import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useStoreIds } from './useStoreIds';

/**
 * 選択された店舗のIDを取得する
 */
export const useSelectStoresId = () => {
  
  const selectedStores = useWatch<TypeOfForm>({ 
    name: 'stores', 
  }) as string[] | null;

  const storeIds = useStoreIds(selectedStores ?? []);
  return storeIds;

};