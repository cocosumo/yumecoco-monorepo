import { Properties } from '@kintone/rest-api-client/lib/client/types';

export const removeLookUp = (obj: Properties): void => {
  Object.entries(obj).forEach(([key, value]) => {
    if ('lookup' in value) {
      delete obj[key];
    }

    if ('fields' in value) {
      removeLookUp(value.fields);
    }
  });
};