import { TypeOfForm } from '../schema';
import { Territory } from 'types';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useMemo } from 'react';

export const useParseQuery = (): TypeOfForm => {
  const {
    search,
  } = useLocation();

 

  const newMemoedForm = useMemo(() => {
    const parsedQuery: Partial<TypeOfForm> = qs.parse(search.replace(/^\?/, ''), { comma: true });

    const {
      keyword,
      custName,
      address,

      stores,
      projTypes,

      territories,

      includeRetired,
      cocoAG,

      yumeAG,

      completionDateFrom,
      completionDateTo,

      contractDateFrom,
      contractDateTo,
    } = parsedQuery;

    return {
      keyword: keyword ?? null,
      custName: custName ?? null,
      address: address ?? null,
      stores: ([] as string[]).concat(stores ?? []),
      projTypes: ([] as string[]).concat(projTypes ?? []),
      territories: ([] as Territory[]).concat(territories ?? []),
      includeRetired: typeof includeRetired === 'string' && includeRetired === 'true',
      cocoAG: ([] as string[]).concat(cocoAG ?? []),
      yumeAG: ([] as string[]).concat(yumeAG ?? []),
      completionDateFrom: completionDateFrom ?? null,
      completionDateTo: completionDateTo ?? null,
      contractDateFrom: contractDateFrom ?? null,
      contractDateTo: contractDateTo ?? null,
    };
  }, [
    search,
  ]);

  return newMemoedForm;
};