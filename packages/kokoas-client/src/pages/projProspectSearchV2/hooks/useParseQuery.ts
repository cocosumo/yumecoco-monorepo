import { TForm } from '../schema';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useMemo } from 'react';
import { initialForm } from '../form';

/* export interface TFormQuery extends Omit<TForm, 'contractDateFrom' | 'contractDateTo'> {
  contractDateFrom: string,
  contractDateTo: string,
}
 */
export const useParseQuery = (): TForm => {
  const {
    search,
  } = useLocation();

  const newMemoedForm = useMemo((): TForm => {
    const parsedQuery: Partial<TForm> = qs.parse(search.replace(/^\?/, ''), { comma: true });

    return {
      ...initialForm,
      ...parsedQuery,
      ranks: ([] as string[]).concat(parsedQuery.ranks || []),
      contractDateFrom: parsedQuery.contractDateFrom as string || '',
      contractDateTo: parsedQuery.contractDateTo as string || '',
    };
  }, [
    search,
  ]);

  return newMemoedForm;
};