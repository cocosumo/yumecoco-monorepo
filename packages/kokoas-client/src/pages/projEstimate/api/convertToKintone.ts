import { IProjestimates } from 'types';
import { TypeOfForm } from '../form';

export const convertToKintone = ({
  customerName,
  items,
  projId,
  projName,
  projTypeId,
  projTypeName,
  projTypeProfit,
  status,
  taxRate,
  estimateRevision,
}: TypeOfForm) => {

  
  /*
    itemsの変換処理 
    現在、最終行の原価はゼロだったら、保存しない仕様ですが、条件が変わることを想定して、reduceにしました。~ ras
  */
  const subtableItems = items.reduce(
    (
      acc,
      {
        majorItem,
        middleItem,
        material,
        materialDetails,
        costPrice,
        quantity,
        unit,
        rowUnitPriceAfterTax,
        taxable,
        rowDetails,
      }, 
      index,
    ) => {

      if (index === items.length - 1
        && !(+(costPrice ?? 0))
      ) {
        // 最終行の原価はゼロだと、保存しない
        return acc;
      }

      acc.push({
        id: '', // 自動生成
        value: {
          部材備考: { value: materialDetails ?? '' },
          備考: { value: rowDetails ?? '' },
          大項目: { value: majorItem ?? '' },
          中項目: { value: middleItem ?? '' },
          部材名: { value: material ?? '' },
          原価 : { value: costPrice.toString() },
          数量 : { value: quantity.toString() },
          単位: { value: unit },
          金額: { value: rowUnitPriceAfterTax.toString() },
          taxType: { value: taxable ? '課税' : '非課税' },
        },
      });

      return acc;

    }, [] as Array<{
      id: '', // 自動生成
      value: {
        部材備考: { value: string },
        備考: { value: string },
        大項目: { value:string },
        中項目: { value: string },
        部材名: { value: string },
        原価 : { value: string },
        数量 : { value: string },
        単位: { value: string },
        金額: { value: string },
        taxType: { value: string },
      },
    }>);

  const kintoneItems: Partial<IProjestimates>['内訳'] = {
    type: 'SUBTABLE',
    value: subtableItems,
  };

  /* 変換処理 */
  const kintoneRecord: Partial<IProjestimates> = {
    projId: { value: projId },
    projTypeId: { value: projTypeId },
    顧客名: { value: customerName || '' },
    工事名称: { value: projName },
    工事種別名: { value: projTypeName },
    工事種別利益: { value: (projTypeProfit || '').toString() },
    税: { value: taxRate.toString() },
    estimateStatus : { value: status || '' },
    内訳: kintoneItems,
    $revision: {
      type: '__REVISION__',
      value: estimateRevision || '',
    },
  };

  return kintoneRecord;
};