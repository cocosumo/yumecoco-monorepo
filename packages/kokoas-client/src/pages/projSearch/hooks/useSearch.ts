import { useQuery } from '@tanstack/react-query';
//import { search } from '../api/search'; 

// fakerは膨大なデータを生成するので、一旦コメントアウト

export const useSearch =  () => {
  return useQuery(
    [
      'projSearch',
      // TODO: 引数もキーに含める
    ],
    //search,
    async () => ([{ uuid: '123', name: 'test' }]),
  );
};