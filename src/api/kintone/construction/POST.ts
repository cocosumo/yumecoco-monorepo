import { ConstructionDetailsValues } from '../../../pages/construction/form';
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

/**
 * Upserts records
 *
 * @param rawValues
 * @returns
 */
export const saveConstructionData = async (rawValues: ConstructionDetailsValues) : Promise<{
  id: string,
  revision: string,
}> =>{
  const { id } = rawValues;
  const record = convertToKintone(rawValues);

  if (id){
    return KintoneRecord.updateRecord({
      app: APPIDS.constructionDetails,
      id: id as string,
      record,
    })
      .then((result) => ({
        id: id.toString(),
        revision: result.revision,
      }));
  } else {
    return KintoneRecord.addRecord({ app: APPIDS.constructionDetails, record })
      .catch(err => {
        console.log(err.errors);
        throw new Error('err');
      });
  }

};