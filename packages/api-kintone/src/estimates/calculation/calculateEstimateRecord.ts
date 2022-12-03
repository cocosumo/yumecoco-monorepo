import { TaxType } from 'types';
import { RecordType } from '../config';
import { calculateEstimateRow } from './calculateEstimateRow';
import { calculateEstimateSummary } from './calculateEstimateSummary';

export const calculateEstimateRecord = ({
  record,
} : {
  record: RecordType,
}) : {
  calculatedEstimateTable: ReturnType<typeof calculateEstimateRow>[],
  estimateSummary: ReturnType<typeof calculateEstimateSummary>
} => {
  const {
    内訳: { value: estimatesTable },
    税: { value: tax },
  } = record;

  const taxRate = +tax / 100;

  const calculatedEstimateTable = estimatesTable.map(({
    value: {
      原価: costPrice,
      金額: rowUnitPriceAfterTax,
      taxType,
      数量: quantity,

    },
  }) => {

    return calculateEstimateRow({
      costPrice: +costPrice.value,
      isTaxable:  (taxType.value as TaxType) === '課税',
      quantity: +quantity.value,
      taxRate: taxRate,
      rowUnitPriceAfterTax: +rowUnitPriceAfterTax.value,
    });

  });






  return {
    calculatedEstimateTable,
    estimateSummary: calculateEstimateSummary(calculatedEstimateTable),
  };
  
};