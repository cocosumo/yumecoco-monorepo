import { useWatch } from 'react-hook-form';
import { Item, TypeOfForm } from '../form';

export const useSubTotalCalc = (): Array<[string, number]> => {

  const items = useWatch<TypeOfForm>({
    name: 'items',
  });

  const result = (items as Item[])
    .reduce((acc, { majorItem, rowUnitPriceAfterTax })=> {
      if (!rowUnitPriceAfterTax) return acc;

      if (!majorItem) {
        acc['---'] += rowUnitPriceAfterTax;

      } else {
        if (!acc[majorItem]) {
          acc[majorItem] = 0;
        }

        acc[majorItem] += rowUnitPriceAfterTax;

      }

      return acc;
    }, {
      '---': 0,
    } as Record<string, number>);

  return Object.entries(result);
};