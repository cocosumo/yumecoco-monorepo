import { TaxType } from 'types';
import { RecordType } from '../config';
import { calculateEstimateRow } from './calculateEstimateRow';
import { calculateEstimateSummary } from './calculateEstimateSummary';

/**
 *
 * 見積レコードを受け、計算する
 *
 * @param param.record  見積のレコード
 * @param param.withDetails  [false] - 計算の詳細を帰り値に含むかどうか。
 */
export const calculateEstimateRecord = ({
  record,
  withDetails = false,
} : {
  /** 見積のレコード  */
  record: RecordType,

  /** 計計算の詳細を含むかどうか  */
  withDetails?: boolean
}) : {
  details: ReturnType<typeof calculateEstimateRow>[] | undefined,
  summary: ReturnType<typeof calculateEstimateSummary>
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
    details: withDetails ? calculatedEstimateTable : undefined,
    summary: calculateEstimateSummary(calculatedEstimateTable),
  };

};