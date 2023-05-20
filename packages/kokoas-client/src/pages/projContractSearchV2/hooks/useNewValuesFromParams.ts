import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';
import { useMemo } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { stepsKeys } from '../parts/filterDialog/ContractStatusIncomplete';

export const useNewValuesFromParams = () => {
  const urlParams = useURLParamsV2<TypeOfForm>();

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