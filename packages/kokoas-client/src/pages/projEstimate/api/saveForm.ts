import { IProjestimates } from 'types';
import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

const convertToKintone = ({
  projId,
  projName,
  projTypeId,
  projTypeName,
  projTypeProfit,
  customerName,
  tax,
  items,
  status,
}: TypeOfForm) => {

  /* itemsの変換処理 */
  const kintoneItems: Partial<IProjestimates>['内訳'] = {
    type: 'SUBTABLE',
    value: items.map(({
      majorItem, middleItem, element,
      costPrice, quantity, unit, elemProfRate,
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

export const saveForm = async (form: TypeOfForm) => {
  const { estimateId } = form;
  const newKintoneRecord =  convertToKintone(form);


  if (estimateId) {

    const { revision } = await KintoneRecord.updateRecord({
      app: APPIDS.projectEstimate,
      id: estimateId,
      record: newKintoneRecord,
    });

    /* Kintone's update API does't return updated record's id,
    so I added it here to make this function more abstract. ~ras
    */
    return {
      id: estimateId,
      revision,
    };

  } else {
    return KintoneRecord.addRecord({
      app: APPIDS.projectEstimate,
      record: newKintoneRecord,
    });
  }

  /* 194(ココアス：工事内容)を更新 */
};