import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getAllStores } from 'api-kintone';

type GetAllStoresReturn = Awaited<ReturnType<typeof getAllStores>>;

export const useStores = <K = GetAllStoresReturn>(
  select?: (data: Awaited<ReturnType<typeof getAllStores>>) => K) => {
  return useQuery(
    [AppIds.stores],
    () => getAllStores(),
    { 
      select, 
      //initialData: [],
    },
  );
};