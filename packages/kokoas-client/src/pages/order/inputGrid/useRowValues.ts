import { useCallback } from 'react';
import { TItem } from '../schema';
import { initialRow } from '../form';

export const useRowValues = () => {



  const getNewRow = useCallback(() : TItem => {
    return ({
      ...initialRow,
    });
  }, []);


  return {
    getNewRow,
  };

};