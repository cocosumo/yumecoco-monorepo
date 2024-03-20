import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getAllUnits } from 'api-kintone';

type GetAllUnitsReturn = Awaited<ReturnType<typeof getAllUnits>>;

export const useUnits = <K = GetAllUnitsReturn>(
  select?: (data: GetAllUnitsReturn) => K) => {
  return useQuery(
    [AppIds.units, 'getAllUnits'],
    getAllUnits,
    { 
      select, 
    },
  );
};