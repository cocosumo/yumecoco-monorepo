import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { calcTotalUnitPrice } from '../helpers/calcTotalUnitPrice';
import { calcUnitPrice } from '../helpers/calcUnitPrice';



export const useElementCalc = (rowIdx: number) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { taxRate, items } = values;
  const { costPrice, quantity, elemProfRate, tax } = items[rowIdx];


  const newUnitPrice = calcUnitPrice(costPrice, elemProfRate);

  return {
    unitPrice: newUnitPrice,
    price: calcTotalUnitPrice(newUnitPrice, quantity, taxRate, tax),
  };
};