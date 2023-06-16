import { useQuery } from '@tanstack/react-query';
import { searchAndpad } from '../api/andpad/searchAndpad';
import { GetMyOrdersResponse } from 'api-andpad';


type DefaultResult = Awaited<ReturnType<typeof searchAndpad>>;




export const useAndpadByProjName = <T = DefaultResult>(
  projName: string, 
  options?: {
    select: (data: GetMyOrdersResponse) => T
  }, 
) => {

  return useQuery(
    [
      'andpad',
      'projName',
      projName,
    ],
    () => searchAndpad({ q: `案件名　LIKE　${projName}`  }),
    {
      ...options,
    },
  );

};