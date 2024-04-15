import { useCallback } from 'react';
import { TItem } from '../schema';
import { initialRow } from '../form';
import { v4 } from 'uuid';

export const useRowValues = () => {

  const getNewRow = useCallback(() : TItem => {
    return ({
      ...initialRow,
      itemId: v4(),
    });
  }, []);


  return {
    getNewRow,
  };

};