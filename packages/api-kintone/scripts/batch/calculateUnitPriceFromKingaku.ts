import { calculateEstimateRow } from 'api-kintone/src';
import { AppIds, isProd } from 'config';
import { produce } from 'immer';
import { DeepPartial, IProjestimates } from 'types';
import { KintoneClientBasicAuth } from './settings';


/**
 * 計算する、
 */
export const calculateUnitPriceFromKingaku = async () => {
  const KintoneRecord = KintoneClientBasicAuth.record;
  const appId = AppIds.projEstimates;
  try {
    const records = await KintoneRecord.getAllRecords({
      app: appId,
    }) as unknown as IProjestimates[];


    console.log(`Production: ${isProd}, AppId: ${appId}`);

    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<IProjestimates>

    }>(({
      $id,
      内訳,
      税,
    })=>{
      return {
        id: $id.value,
        record: {
          内訳: {
            type: 'SUBTABLE',
            value: produce(内訳.value, (draft) => {
              const taxRate = +税.value / 100;

              draft.forEach((d) => {

                const {
                  taxType: { value: taxType },
                  原価: { value: costPrice },
                  数量: { value: quantity },
                } = d.value;

                // field to be deprecated
                const rowUnitPriceAfterTax = (d.value as any).金額.value;

                const {
                  unitPrice,
                } = calculateEstimateRow({
                  costPrice: +costPrice,
                  isTaxable: taxType === '課税',
                  quantity: +quantity,
                  taxRate,
                  rowUnitPriceAfterTax: +rowUnitPriceAfterTax,
                });

                d.value.単価.value = String(unitPrice);
              });
            }),
          },
        },
      };
    });

    const updated = await KintoneRecord.updateAllRecords({
      app: appId,
      records: updatedRecords as any,
    });

    return updated;

  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }

};