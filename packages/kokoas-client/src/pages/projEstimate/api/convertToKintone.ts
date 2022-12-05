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
  tax,
}: TypeOfForm) => {

  /* itemsの変換処理 */
  const kintoneItems: Partial<IProjestimates>['内訳'] = {
    type: 'SUBTABLE',
    value: items.map(({
      majorItem, 
      middleItem, 
      element,
      costPrice, 
      quantity, 
      unit, 
      elemProfRate,
      rowUnitPriceAfterTax,
      taxType,
    }) => {
      return {
        id: '', // 自動生成
        value: {
          大項目: { value: majorItem },
          中項目: { value: middleItem },
          部材名: { value: element },
          原価 : { value: costPrice.toString() },
          数量 : { value: quantity.toString() },
          単位: { value: unit },
          金額: { value: rowUnitPriceAfterTax.toString() },

          /** @deprecated Field will no longer be used. */
          部材利益率: { value: elemProfRate.toString() }, 
          taxType: { value: taxType },
        },
      };
    }),
  };


  /* 変換処理 */
  const kintoneRecord: Partial<IProjestimates> = {
    projId: { value: projId },
    projTypeId: { value: projTypeId },
    顧客名: { value: customerName },
    工事名称: { value: projName },
    工事種別名: { value: projTypeName },
    工事種別利益: { value: projTypeProfit.toString() },
    税: { value: tax.toString() },
    estimateStatus : { value: status },
    内訳: kintoneItems,
  };

  return kintoneRecord;
};