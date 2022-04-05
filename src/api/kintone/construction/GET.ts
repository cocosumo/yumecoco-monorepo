import { initialValues } from '../../../pages/construction/form';
import { APPIDS, KintoneRecord } from '../config';

export const getConstDetails = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  });
};

export const getFlatConstDetails = async (recordId:　string) => {
  const kintoneRecord = await getConstDetails(recordId);
  console.log(kintoneRecord);
  return Object.entries(kintoneRecord.record).reduce((acc, [key, val]) => {
    if (key in initialValues){
      return { ...acc, [key]: val.value };
    }
    return acc;
  }, {});

};