import { TypeOfForm } from '../form';

const convertToKintone = ({
  customerName, projName, projType,
  profitRate, taxRate,

}: TypeOfForm) => {

  /* 変換処理 */
  const kintoneRecord: Partial<Estimates.main.SavedData> = {

    顧客名: { value: customerName },
    工事名称: { value: projName },
    工事種別名: { value: projType },
    利益率: { value: profitRate.toString() },
    税率: { value: taxRate.toString() },

  };

  return kintoneRecord;
};

export const saveForm = (form: TypeOfForm) => {

  const newKintoneRecord =  convertToKintone(form);


  /* 194(ココアス：工事内容)を更新 */
};