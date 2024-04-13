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
    内訳: items,
    税: tax,
  } = record || {};

  const taxRate = +tax.value / 100;

  const calculatedEstimateTable = items?.value.map(({
    value: {
      原価: costPrice,
      単価: unitPrice,
      税率: rowTaxRate,
      数量: quantity,

    },
  }) => {

    return calculateEstimateRow({
      costPrice: +costPrice.value,
      isTaxable:  +(rowTaxRate.value) > 0,
      quantity: +quantity.value,
      taxRate,
      unitPrice: +unitPrice.value,
    });

  });


  return {
    details: withDetails ? calculatedEstimateTable : undefined,
    summary: calculateEstimateSummary(calculatedEstimateTable, taxRate),
  };

};

export type CalculateEstimateRecordReturn = ReturnType<typeof calculateEstimateRecord>;