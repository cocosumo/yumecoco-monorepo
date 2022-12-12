
import { getAllEstimates, calculateEstimateRow } from 'api-kintone';
import { IProjestimates, TaxType } from 'types';
import { produce } from 'immer';
import { AppIds, isProd } from 'config';
import { KintoneClientBasicAuth } from './settings';


// 仮スクリプトです。部材利益率が無くなったら、廃止。


(async () => {
  console.log('Running in production :', isProd);
  const KintoneRecord = KintoneClientBasicAuth.record;
  // 金額の無いレコードを取得
  const records = await getAllEstimates({
    condition: '金額 in ("")',
  });

  // 金額を計算する
  const newRecords: Partial<IProjestimates>[] = records
    .map(({ 内訳, 税 }) => {
      return {
        内訳: produce(内訳, ({ value: tbl }) => {
          tbl.forEach(({ value: row }) => {
            const {
              taxType,
              原価,
              数量,
              部材利益率,
            } = row;

            const {
              rowUnitPriceAfterTax,
            } = calculateEstimateRow({
              costPrice: +原価.value,
              isTaxable: (taxType.value as TaxType) === '課税',
              quantity: +数量.value,
              taxRate: +税.value / 100,
              profitRate: +部材利益率.value / 100,

            });

            row.金額.value = rowUnitPriceAfterTax.toString();

          });
        }),
      };
    });


  // 保存

  const result = await KintoneRecord.updateAllRecords({
    app: AppIds.projEstimates,
    records: records.map(({ $id }, idx) => {
      return {
        id: $id.value,
        record: newRecords[idx],
      };
    }),
  });


  console.log('DONE', result);
})();