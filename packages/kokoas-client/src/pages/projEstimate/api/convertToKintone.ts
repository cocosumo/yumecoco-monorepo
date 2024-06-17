import { IProjestimates } from 'types';
import { TForm } from '../schema';

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
  remarks,
}: TForm) => {

  const parsedTaxRate = taxRate / 100;
  /*
    itemsの変換処理
    現在、最終行の原価はゼロだったら、保存しない仕様ですが、条件が変わることを想定して、reduceにしました。~ ras
  */
  const subtableItems = items.reduce(
    (
      acc,
      {
        itemId,
        majorItem,
        middleItem,
        material,
        materialDetails,
        costPrice,
        quantity,
        unit,
        unitPrice,
        rowDetails,
      },
    ) => {


      acc.push({
        id: !isNaN(Number(itemId)) ? itemId : '', // 自動生成
        value: {
          部材備考: { value: materialDetails || '' },
          備考: { value: rowDetails || '' },
          大項目: { value: majorItem || '' },
          中項目: { value: middleItem || '' },
          部材名: { value: material || '' }, 
          原価 : { value: costPrice.toString() },
          数量 : { value: quantity.toString() },
          単位: { value: unit || '' },
          単価: { value : unitPrice.toString() },
          税率: { value: parsedTaxRate.toString() },
        },
      });

      return acc;

    }, [] as Array<{
      id: string, // 自動生成
      value: {
        部材備考: { value: string },
        備考: { value: string },
        大項目: { value:string },
        中項目: { value: string },
        部材名: { value: string },
        原価 : { value: string },
        数量 : { value: string },
        単価 : { value: string },
        単位: { value: string },
        税率: { value: string }
      },
    }>,
  );

  const kintoneItems: Partial<IProjestimates>['内訳'] = {
    type: 'SUBTABLE',
    value: subtableItems,
  };

  /* 変換処理 */
  const kintoneRecord: Partial<IProjestimates> = {
    projId: { value: projId },
    projTypeId: { value: projTypeId || '' },
    顧客名: { value: customerName || '' },
    工事名称: { value: projName },
    工事種別名: { value: projTypeName || '' },
    工事種別利益: { value: (projTypeProfit || '').toString() },
    税: { value: taxRate.toString() },
    estimateStatus : { value: status || '' },
    内訳: kintoneItems,
    remarks: { value: remarks || '' },

  };

  return kintoneRecord;
};