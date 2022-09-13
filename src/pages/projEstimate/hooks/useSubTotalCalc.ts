import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { calcPrice } from '../helpers/calcPrice';
import { calcUnitPrice } from '../helpers/calcUnitPrice';

export const useSubTotalCalc = (): Array<[string, number]> => {
  const { values } = useFormikContext<TypeOfForm>();
  const { taxRate, items } = values;

  const result = items.reduce((acc, { majorItem, costPrice, elemProfRate, quantity, tax })=> {
    
    const unitPrice = calcUnitPrice(costPrice, elemProfRate);
    const price = calcPrice(unitPrice, quantity, taxRate, tax);

    const target = acc.find(([key]) => key === majorItem);
    if (target) {
      target[1] += +price;
    } else {
      acc.push([majorItem, price]);
    }
    return acc;
  }, [] as Array<[string, number]>);

  return result;
};