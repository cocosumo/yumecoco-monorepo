import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { v4 as uuidv4 } from 'uuid';


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
  
  const isLastRow = rowIdx === items.length - 1;

  //const result = useElementCalc(rowIdx);


  useEffect(() => {

    setValues(
      (prev) => produce(prev, (draft) => {

        if ((+costPrice < 0)) {
          draft.items[rowIdx].quantity = 1;
          draft.items[rowIdx].elemProfRate = 0;
          draft.items[rowIdx].taxType = '非課税';
        } else if ( isLastRow && +costPrice > 0) {
          draft.items.push({
            ...initialValues.items[0],
            key: uuidv4(),
            elemProfRate: draft.projTypeProfit,
          });
        }

        draft.items[rowIdx].costPrice = costPrice;
      }),
    );
  }, [costPrice, isLastRow, setValues, rowIdx]);
};