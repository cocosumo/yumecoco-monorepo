import { useLocation } from 'react-router-dom';
import { KeyOfForm, TypeOfForm } from '../schema';
import qs from 'qs';
import { initialValues } from '../form';
import { useMemo } from 'react';
import parseISO from 'date-fns/parseISO';
import { Order } from 'types';


export const useParsedQuery = () => {
  const {
    search,
  } = useLocation();

  const newMemoedForm = useMemo<TypeOfForm>(() => {
    const parsedQuery: Partial<Record<KeyOfForm, string>> = qs.parse(search.replace(/^\?/, ''), { comma: true });
    const {
      projName,
      invoiceDateFrom,
      invoiceDateTo,
      order,
      orderBy,
    } = parsedQuery;

    return {
      ...initialValues,
      projName: projName ?? initialValues.projName,
      invoiceDateFrom: invoiceDateFrom ? parseISO(invoiceDateFrom) : initialValues.invoiceDateFrom,
      invoiceDateTo: invoiceDateTo ? parseISO(invoiceDateTo) : initialValues.invoiceDateTo,
      order: order as Order,
      orderBy: orderBy as KeyOfForm ?? initialValues.orderBy,
    };
  }
  , [search]);
    
  return newMemoedForm;
};