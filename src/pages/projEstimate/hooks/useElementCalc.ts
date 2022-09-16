import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { calcGrossPrice } from '../helpers/calcGrossPrice';
import { calcUnitPrice } from '../helpers/calcUnitPrice';



export const useElementCalc = (rowIdx: number) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { taxRate, items } = values;
  const { costPrice, quantity, elemProfRate, taxType } = items[rowIdx];


  const newUnitPrice = calcUnitPrice(costPrice, elemProfRate);

  return {
    unitPrice: newUnitPrice,
    price: calcGrossPrice(newUnitPrice, quantity, taxRate, taxType),
  };
};