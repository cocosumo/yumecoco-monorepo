import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { calcGrossPrice } from '../helpers/calcGrossPrice';
import { calcUnitPrice } from '../helpers/calcUnitPrice';

export const useSubTotalCalc = (): Array<[string, number]> => {
  const { values } = useFormikContext<TypeOfForm>();
  const { tax, items } = values;

  const result = items.reduce((acc, { majorItem, costPrice, elemProfRate, quantity, taxType })=> {

    const unitPrice = calcUnitPrice(costPrice, elemProfRate);
    const grossPrice = calcGrossPrice(unitPrice, quantity, tax, taxType);

    const target = acc.find(([key]) => key === majorItem);
    if (target) {
      target[1] += +grossPrice;
    } else if (majorItem !== '') {
      acc.push([majorItem, grossPrice]);
    }
    return acc;
  }, [] as Array<[string, number]>);

  return result;
};