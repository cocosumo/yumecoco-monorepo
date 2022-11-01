import { KintoneFormFieldProperty } from '@kintone/rest-api-client';
import { APPIDS, KintoneClient } from '../config';

export const getLookUpFields = async (appId: APPIDS) => {
  const { properties } = await KintoneClient.app.getFormFields({
    app: appId,
  });

  const lookUpFieldKeys : string[] = []; 

  Object.keys(properties).map(key => {
    if ('lookup' in properties[key]) {
      lookUpFieldKeys.push(key);
    }

    /** Subtableの場合 */
    if ('fields' in properties[key]) {
      const subtable = properties[key] as KintoneFormFieldProperty.Subtable<any>;
      const hasLookUp = Object.keys(subtable.fields).some(subTblFldKey => {
        return 'lookup' in subtable.fields[subTblFldKey];
      });
      
      if (hasLookUp) {
        lookUpFieldKeys.push(key);
      }
    }
  });

  return lookUpFieldKeys;

};