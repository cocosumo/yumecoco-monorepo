import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { TForm, TItem } from '../schema';
import { initialRow } from '../form';
import { v4 } from 'uuid';

export const useRowValues = () => {

  const {
    getValues,
  } = useFormContext<TForm>();

  const getNewRow = useCallback(() : TItem => {
    return ({
      ...initialRow,
      itemId: v4(),
      materialProfRate: getValues('projTypeProfit'),
    });
  }, [getValues]);


  return {
    getNewRow,
  };

};