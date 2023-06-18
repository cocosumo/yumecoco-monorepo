import { useWatch } from 'react-hook-form';
import { TForm } from '../schema';

export const useSubTotalCalc = (): Array<[string, number]> => {

  const items = useWatch<TForm>({
    name: 'items',
  });

  const result = (items as TForm['items'])
    .reduce((acc, { majorItem, rowUnitPriceAfterTax })=> {

      const parsedValue = +(rowUnitPriceAfterTax ?? 0);
      if (!parsedValue) return acc;

      if (!majorItem) {
        acc['---'] += +parsedValue;

      } else {
        if (!acc[majorItem]) {
          acc[majorItem] = 0;
        }
        acc[majorItem] += +parsedValue;

      }

      return acc;
    }, {
      '---': 0,
    } as Record<string, number>);

  return Object.entries(result);
};