import { useQuery } from '@tanstack/react-query';
import { search } from '../api/search';


export const useSearch =  () => {
  return useQuery(
    [
      'projSearch',
      // TODO: 引数もキーに含める
    ],
    search,
  );
};