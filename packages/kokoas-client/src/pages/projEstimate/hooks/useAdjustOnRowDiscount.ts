import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';

export const useAdjustOnRowDiscount = (rowIdx: number) => {
  const { setValues,
    values : {
      items,
    },
  } = useFormikContext<TypeOfForm>();
  const rowData = items[rowIdx];

  const {
    costPrice,
  } = rowData;

  useEffect(() => {

    setValues(
      (prev) => produce(prev, (draft) => {

        if ((+costPrice < 0)) {
          draft.items[rowIdx].quantity = 1;
          draft.items[rowIdx].elemProfRate = 0;
          draft.items[rowIdx].taxType = '非課税';
        }

        draft.items[rowIdx].costPrice = costPrice;
      }),
    );
  }, [costPrice, setValues, rowIdx]);

};