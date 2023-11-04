import { useMemo } from 'react';
import { initialValues } from '../form';
import { useTypedURLParams } from './useTypedHooks';
import parseISO from 'date-fns/parseISO';

export const useNewValuesFromParams = () => {
  const urlParams = useTypedURLParams();

  const newValues = useMemo(() => {
    const {
      contractDateFrom,
      contractDateTo,
      order,
      orderBy,
    } = urlParams;
    // 一部のステップが選択されている場合は、未完了チェックボックスをオンにする
    
    return {
      ...initialValues,
      ...urlParams,
      order: order || 'desc',
      orderBy: orderBy || 'contractDate',
      contractDateFrom: contractDateFrom ? parseISO(contractDateFrom as unknown as string) : null,
      contractDateTo: contractDateTo ? parseISO(contractDateTo as unknown as string) : null,
    };
  }, [urlParams]);

  return newValues; 
};