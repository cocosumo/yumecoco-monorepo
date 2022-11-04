import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getActiveEmployees } from 'api-kintone';

export const useEmployees = () => {
  return useQuery(
    [AppIds.stores],
    //getActiveEmployees,
  );
};