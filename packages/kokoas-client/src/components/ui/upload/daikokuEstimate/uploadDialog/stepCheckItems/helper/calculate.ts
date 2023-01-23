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

  const calculatedEstimateTable = items.map(({
    costPrice,
    quantity,
    unitPrice,
  }) => {

    return calculateEstimateRow({
      costPrice,
      isTaxable:  true,
      quantity,
      taxRate: parsedTaxRate,
      unitPrice,
    });

  });


  return {
    details: calculatedEstimateTable,
    summary: calculateEstimateSummary(calculatedEstimateTable),
  };

};