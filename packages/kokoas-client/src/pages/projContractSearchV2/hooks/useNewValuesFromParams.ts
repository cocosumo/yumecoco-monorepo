import { useMemo } from 'react';
import { initialValues } from '../form';
import { stepsKeys } from '../parts/filterDialog/ContractStatusIncomplete';
import { useTypedURLParams } from './useTypedHooks';

export const useNewValuesFromParams = () => {
  const urlParams = useTypedURLParams();

  return useMemo(() => {

    // 一部のステップが選択されている場合は、未完了チェックボックスをオンにする
    const someStepsSelected = stepsKeys.some((key) => urlParams[key]);
    
    return {
      ...initialValues,
      ...urlParams,
      contractIncomplete: someStepsSelected,
    };
  }, [urlParams]);

};