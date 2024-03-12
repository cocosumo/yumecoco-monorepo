import { useQuery } from '@tanstack/react-query';
import { checkServer } from '../api/others/checkServer';

export const useCheckServer = () => {
  return useQuery({
    queryKey: ['checkServer'],
    queryFn: checkServer,
    refetchInterval: 5000, 
    initialData: {
      runtime: 0,
      alive: false,
    },
  });
};