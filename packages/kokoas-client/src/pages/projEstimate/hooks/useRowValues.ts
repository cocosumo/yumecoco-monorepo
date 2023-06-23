import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { TForm, TItem } from '../schema';
import { initialRow } from '../form';

export const useRowValues = () => {

  const {
    getValues,
  } = useFormContext<TForm>();

  const getNewRow = useCallback(() : TItem => {
    return ({
      ...initialRow,
      materialProfRate: getValues('projTypeProfit'),
    });
  }, [getValues]);


  return {
    getNewRow,
  };

};