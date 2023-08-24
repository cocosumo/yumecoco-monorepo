import { TForm } from '../schema';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useMemo } from 'react';
import { initialForm } from '../form';


export const useParseQuery = (): TForm => {
  const {
    search,
  } = useLocation();

  const newMemoedForm = useMemo((): TForm => {
    const parsedQuery: Partial<TForm> = qs.parse(search.replace(/^\?/, ''), { comma: true });

    return {
      ...initialForm,
      ...parsedQuery,
    };
  }, [
    search,
  ]);

  return newMemoedForm;
};