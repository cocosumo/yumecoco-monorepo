import { CalculationEstimateResults, calculateEstimateRow } from 'api-kintone';
import { Big } from 'big.js';
import { IProjestimates } from 'types';

type GroupedEstItemsParams = IProjestimates['内訳']['value'];

type GroupedEstItemsResult = Record<string, {
  groupAmountAfterTax: number,
  groupAmountBeforeTax: number,
  items: Array<GroupedEstItemsParams[number]['value'] & CalculationEstimateResults>
}>;

export const groupEstItems  = (estItems: GroupedEstItemsParams) => {

  const groupedEstItems = estItems
    .reduce<GroupedEstItemsResult>(
    (acc, curr) => {
      const row = curr.value;
      const { 
        大項目, 
        税率,
        単価,
        原価,
        数量,
      } = row;

      const summary = calculateEstimateRow({
        isTaxable: Boolean(+税率.value),
        unitPrice: +単価.value,
        costPrice: +原価.value,
        quantity: +数量.value,
        taxRate: +税率.value,
      });

      const {
        rowUnitPriceAfterTax,
        rowUnitPriceBeforeTax,
      } = summary;

      if (!acc[大項目.value]) {
        acc[大項目.value] = {
          groupAmountAfterTax: 0,
          groupAmountBeforeTax: 0,
          items: [],
        };
      } 

      acc[大項目.value].groupAmountAfterTax = Big(acc[大項目.value].groupAmountAfterTax)
        .add(rowUnitPriceAfterTax)
        .toNumber();
      
      acc[大項目.value].groupAmountBeforeTax = Big(acc[大項目.value].groupAmountBeforeTax)
        .add(rowUnitPriceBeforeTax)
        .toNumber();

      acc[大項目.value].items.push({ ...row, ...summary });

      return acc;
    }, 
    {},
  );

  return Object.entries(groupedEstItems);
};