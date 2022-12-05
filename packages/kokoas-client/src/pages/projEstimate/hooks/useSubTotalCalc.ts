import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';

export const useSubTotalCalc = (): Array<[string, number]> => {
  const { values } = useFormikContext<TypeOfForm>();
  const {  items } = values;

  const result = items.reduce((acc, { majorItem, rowUnitPriceAfterTax })=> {

    const grossPrice = +rowUnitPriceAfterTax;

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