import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useCallback } from 'react';
import { KeyOfForm } from '../form';
import { roundTo } from 'libs';

export const useFormContextExtended = () => {
  const formMethods = useFormContext<TypeOfForm>();

  const { setValue } = formMethods;

  const setRoundedValue = useCallback(
    (key: KeyOfForm, value = 0, precision = 0) => {
      setValue(
        key, 
        roundTo(value, precision),
      );
    }, 
    [setValue],
  );

  return {
    ...formMethods,
    setRoundedValue,
  };

};