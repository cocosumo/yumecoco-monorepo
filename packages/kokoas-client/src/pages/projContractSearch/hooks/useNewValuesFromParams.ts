import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useMemo } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { stepsKeys } from '../parts/filterDialog/ContractStatusIncomplete';

export const useNewValuesFromParams = () => {
  const urlParams = useURLParams<TypeOfForm>();

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