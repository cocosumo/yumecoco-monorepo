import { useCallback } from 'react';
import {  initialRow, TypeOfForm } from '../form';
import { useFormContext } from 'react-hook-form';

export const useRowValues = () => {

  const {
    getValues,
  } = useFormContext<TypeOfForm>();

  const getNewRow = useCallback(() : TypeOfForm['items'][number] => {
    return ({
      ...initialRow,
      elemProfRate: getValues('projTypeProfit'),
    });
  }, [getValues]);


  return {
    getNewRow,
  };

};