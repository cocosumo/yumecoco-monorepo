import { calculateEstimateRow } from 'api-kintone';
import { Big } from 'big.js';
import { IProjestimates } from 'types';


export const groupEstItems  = (estItems: IProjestimates['内訳']['value']) => {

  const groupedEstItems = estItems
    .reduce<Record<string, {
    value: number,
    items: IProjestimates['内訳']['value'][number]['value'][],
  }>>(
    (acc, curr) => {
      const row = curr.value;
      const { 
        大項目, 
        税率,
        単価,
        原価,
        数量,
      } = row;

      const {
        rowUnitPriceAfterTax,
      } = calculateEstimateRow({
        isTaxable: Boolean(+税率.value),
        unitPrice: +単価.value,
        costPrice: +原価.value,
        quantity: +数量.value,
        taxRate: +税率.value,
      });

      if (!acc[大項目.value]) {
        acc[大項目.value] = {
          value: 0,
          items: [],
        };
      } 

      acc[大項目.value].value = Big(acc[大項目.value].value)
        .add(rowUnitPriceAfterTax)
        .toNumber();

      acc[大項目.value].items.push(row);

      return acc;
    }, 
    {},
  );

  return groupedEstItems;
};