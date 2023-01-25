import { CalculationEstimateResults } from 'api-kintone';
import { IProjestimates, ParsedDaikokuGenka } from 'types';

export const convertToKintone = ({
  projId,
  details,
  parsedDaikoku,
}: {
  projId: string,
  details: CalculationEstimateResults[],
  parsedDaikoku: ParsedDaikokuGenka,
}) => {



  const {
    projDataId,
    estDataId,
    taxRate,
    projName,
    items,
  } = parsedDaikoku;

  const parsedTaxRate = taxRate / 100;

  /*
    itemsの変換処理
    現在、最終行の原価はゼロだったら、保存しない仕様ですが、条件が変わることを想定して、reduceにしました。~ ras
  */
  const subtableItems = details.reduce(
    (
      acc,
      {
        costPrice,
        quantity,
      },
      index,
    ) => {

      const {
        majorItem,
        middleItem,
        material,
        unit,
        unitPrice,
      } = items[index];

      acc.push({
        id: '', // 自動生成
        value: {
          大項目: { value: majorItem ?? '' },
          中項目: { value: middleItem ?? '' },
          部材名: { value: material ?? '' },
          原価 : { value: costPrice.toString() },
          数量 : { value: quantity.toString() },
          単位: { value: unit },
          単価: { value: unitPrice.toString() },
          税率: { value: parsedTaxRate.toString() },
          備考: { value: '' },
          部材備考: { value: '' }, // Need to capture this too.
        },
      });

      return acc;

    }, [] as Array<{
      id: '', // 自動生成
      value: {
        大項目: { value:string },
        中項目: { value: string },
        部材名: { value: string },
        原価 : { value: string },
        数量 : { value: string },
        単位: { value: string },
        単価 : { value: string }
        税率: { value: string }
        備考: { value: string }
        部材備考 : { value: string }
      },
    }>);

  const kintoneItems: Partial<IProjestimates>['内訳'] = {
    type: 'SUBTABLE',
    value: subtableItems,
  };

  /* 変換処理 */
  const kintoneRecord: Partial<IProjestimates> = {
    projId: { value: projId },
    daikokuDataId: { value: `${projDataId}-${estDataId}` },
    工事名称: { value: projName },
    税: { value: taxRate.toString() },
    内訳: kintoneItems,
  };

  return kintoneRecord;
};