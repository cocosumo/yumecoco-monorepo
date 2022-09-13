import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';



export const useCalculate = (rowIdx: number) => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { taxRate, items } = values;
  const { costPrice, quantity, elemProfRate, tax, price } = items[rowIdx];

  useEffect(() => {

    // 単価の算出処理 : IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    let newUnitPrice = 0; // 入力値がエラー(数値でない)時は0にする
    if (!(isNaN(costPrice) || isNaN(elemProfRate)) && ((costPrice) > 0)) {
      newUnitPrice = Math.round(+costPrice * (1 + (+elemProfRate / 100)));
    }

    // 金額の算出処理 : IF(原価 <= 0, 原価, IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量)))
    let newPrice = 0; // 入力値がエラー(数値でない)時は0にする
    if (+costPrice <= 0) {
      newPrice = costPrice;
    } else if ((newUnitPrice !== 0) && !(isNaN(quantity))) {
      if (tax === '課税') {
        newPrice = Math.round((newUnitPrice * +quantity) * (1 + (+taxRate / 100)));
      } else { /* 非課税 */
        newPrice = Math.round(newUnitPrice * +quantity);
      }
    }

    setValues(
      (prev) => produce(prev, (draft) => {
        draft.items[rowIdx].unitPrice = newUnitPrice;
        draft.items[rowIdx].price = newPrice;
      }),
    );
  }, [costPrice, quantity, elemProfRate, tax, taxRate, price]);
};