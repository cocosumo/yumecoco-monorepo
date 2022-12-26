import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useCallback } from 'react';
import { TypeOfForm } from '../form';

export const useMoveItem = () => {
  const { setValues } = useFormikContext<TypeOfForm>();

  const move = useCallback((fromIdx: number, toIdx: number) => {
    setValues((prev) => produce(prev, ({ items }) => {
      [items[fromIdx], items[toIdx]] = [items[toIdx], items[fromIdx]];
    }));
  }, [setValues]);

  return move;
};