import { ConstructionDetailsValues } from '../../../pages/construction/register/form';
import { APPIDS, KintoneRecord } from '../config';

export const convertToKintone = (rawValues: ConstructionDetailsValues) => {
  return Object.entries(rawValues)
    .reduce((acc, [key, rawVal])=>{
      return { ...acc, [key]: { value: rawVal } };
    }, {});

};

export const saveConstructionData = (rawValues: ConstructionDetailsValues) =>{
  const record = convertToKintone(rawValues);
  return KintoneRecord.addRecord({ app: APPIDS.constructionDetails, record });
};
