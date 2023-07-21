import { useMemo } from 'react';
import { initialValues } from '../form';
import { stepsKeys } from '../parts/filterDialog/ContractStatusIncomplete';
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
    const someStepsSelected = stepsKeys.some((key) => urlParams[key]);
    
    return {
      ...initialValues,
      ...urlParams,
      order: order || 'desc',
      orderBy: orderBy || 'contractDate',
      contractIncomplete: someStepsSelected,
      contractDateFrom: contractDateFrom ? parseISO(contractDateFrom as unknown as string) : null,
      contractDateTo: contractDateTo ? parseISO(contractDateTo as unknown as string) : null,
    };
  }, [urlParams]);

  return newValues; 
};