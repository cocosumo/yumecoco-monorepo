import { useQuery } from '@tanstack/react-query';
import { getAllStores } from 'api-kintone';

export const useStores = () => {
  
  return useQuery(
    ['stores'],
    () => getAllStores(),
  );
};