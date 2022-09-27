import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

const convertToKintone = ({
  customerName, projName, projType,
  profitRate, taxRate,
  items, projId,
  status,
}: TypeOfForm) => {

  /* itemsの変換処理 */
  const kintoneItems: Partial<Estimates.main.SavedData>['内訳'] = {
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
          税: { value: taxType },
        },
      };
    }),
  };

  /* 変換処理 */
  const kintoneRecord: Partial<Estimates.main.SavedData> = {
    projId: { value: projId },
    顧客名: { value: customerName },
    工事名称: { value: projName },
    工事種別名: { value: projType },
    利益率: { value: profitRate.toString() },
    税率: { value: taxRate.toString() },
    内訳: kintoneItems,
    estimateStatus: { value: status },
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