import { calculateEstimateRow, calculateEstimateSummary } from 'api-kintone';
import { ParsedDaikokuGenka } from 'types';


export const calculate = ({
  record,
} : {
  /** 見積のレコード  */
  record: ParsedDaikokuGenka,
}) : {
  details: ReturnType<typeof calculateEstimateRow>[],
  summary: ReturnType<typeof calculateEstimateSummary>
} => {

  const {
    taxRate,
    items,
  } = record;

  const parsedTaxRate = +taxRate / 100;

  /*     value: {
      原価: costPrice,
      金額: rowUnitPriceAfterTax,
      taxType,
      数量: quantity,

    }, */

  const calculatedEstimateTable = items.map(({
    costPrice,
    rowUnitPrice,
    quantity,
  }) => {

    return calculateEstimateRow({
      costPrice,
      isTaxable:  false,
      quantity,
      taxRate: parsedTaxRate,
      rowUnitPriceAfterTax: rowUnitPrice,
    });

  });


  return {
    details: calculatedEstimateTable,
    summary: calculateEstimateSummary(calculatedEstimateTable),
  };

};