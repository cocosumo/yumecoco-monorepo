import { TypeOfForm } from '../schema';
import { Territory } from 'types';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useMemo } from 'react';
import { initialForm } from '../form';
import { parseISO } from 'date-fns';

const resolveDate = <T = unknown>(date: T) => typeof date === 'string' ? parseISO(date) : null;


export const useParseQuery = (): TypeOfForm => {
  const {
    search,
  } = useLocation();

  const newMemoedForm = useMemo((): TypeOfForm => {
    const parsedQuery: Partial<TypeOfForm> = qs.parse(search.replace(/^\?/, ''), { comma: true });

    const {
      keyword,
      custName,
      address,

      stores,
      projTypes,

      territories,

      includeRetired,
      includeDeleted,
      cocoAG,

      yumeAG,

      totalContractAmtIncTaxFrom,
      totalContractAmtIncTaxTo,

      contractDateFrom,
      contractDateTo,

      deliveryDateFrom,
      deliveryDateTo,

      paidDateFrom,
      paidDateTo,

      completionDateFrom,
      completionDateTo,

      lastBillDateFrom,
      lastBillDateTo,

      order,
      orderBy,
    } = parsedQuery;

    return {
      ...initialForm,
      totalContractAmtIncTaxFrom: totalContractAmtIncTaxFrom ?? initialForm.totalContractAmtIncTaxFrom,
      totalContractAmtIncTaxTo: totalContractAmtIncTaxTo ?? initialForm.totalContractAmtIncTaxTo,
      order: order ?? initialForm.order,
      orderBy: orderBy ?? initialForm.orderBy,
      keyword: keyword ?? null,
      custName: custName ?? null,
      address: address ?? null,
      stores: ([] as string[]).concat(stores ?? []),
      projTypes: ([] as string[]).concat(projTypes ?? []),
      territories: ([] as Territory[]).concat(territories ?? []),
      includeRetired: typeof includeRetired === 'string' && includeRetired === 'true',
      includeDeleted: typeof includeDeleted === 'string' && includeDeleted === 'true',
      cocoAG: ([] as string[]).concat(cocoAG ?? []),
      yumeAG: ([] as string[]).concat(yumeAG ?? []),

      contractDateFrom: resolveDate(contractDateFrom),
      contractDateTo: resolveDate(contractDateTo),

      completionDateFrom: resolveDate(completionDateFrom),
      completionDateTo: resolveDate(completionDateTo),

      deliveryDateFrom: resolveDate(deliveryDateFrom),
      deliveryDateTo: resolveDate(deliveryDateTo),

      lastBillDateFrom: resolveDate(lastBillDateFrom),
      lastBillDateTo: resolveDate(lastBillDateTo),
      
      paidDateFrom: resolveDate(paidDateFrom),
      paidDateTo: resolveDate(paidDateTo),



    };
  }, [
    search,
  ]);

  return newMemoedForm;
};