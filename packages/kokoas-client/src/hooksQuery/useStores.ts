import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getAllStores } from 'api-kintone';

export const useStores = <K = unknown>(
  select?: (data: Awaited<ReturnType<typeof getAllStores>>) => K) => {
  return useQuery(
    [AppIds.stores],
    getAllStores,
    { 
      select, 
      //initialData: [],
    },
  );
};