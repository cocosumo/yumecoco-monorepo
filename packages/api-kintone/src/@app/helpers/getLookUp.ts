import { OneOf } from '@kintone/rest-api-client/lib/src/KintoneFields/types/field';
import { Lookup } from '@kintone/rest-api-client/lib/src/KintoneFields/types/property';
import { Properties } from '@kintone/rest-api-client/lib/src/client/types';


export const getLookUp = (fields: Properties | OneOf) => {
  const lookupFields: Lookup[] = [];

  for (const f of Object.values(fields)) {

    if ('lookup' in f) {
      lookupFields.push(f);
    }

    if ('fields' in f) {
      lookupFields.push(...getLookUp(f.fields));
    }
  }

  return lookupFields;
};