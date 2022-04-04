import { ConstructionDetailsValues } from '../../../pages/construction/register/form';
import { APPIDS, KintoneRecord } from '../config';

export const convertToKintone = (rawValues: ConstructionDetailsValues) => {
  return Object.entries(rawValues)
    .reduce((acc, [key, rawVal])=>{
      /*
        To simulate boolean, I set field type in kintone to number.
        This requires it to be converted to number when saving.
      */
      const resolveVal = typeof rawVal === 'boolean' ? +rawVal : rawVal;
      return { ...acc, [key]: { value: resolveVal } };
    }, {});

};

export const saveConstructionData = (rawValues: ConstructionDetailsValues) =>{
  const record = convertToKintone(rawValues);
  return KintoneRecord.addRecord({ app: APPIDS.constructionDetails, record })
    .catch(err => {
      console.log(err.errors);
      throw new Error('err');
    });
};
