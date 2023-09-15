import { Properties } from '@kintone/rest-api-client/lib/src/client/types';

export const removeLookUp = <T extends Properties>(obj: T): T => {
  const newObj = Object.create(null);

  for (const [key, value] of Object.entries(obj)) {

    if ('lookup' in value) {
      continue;
    }

    if ('fields' in value) {
      newObj[key] = { ...value, fields: removeLookUp(value.fields) };
    } else {
      newObj[key] = value;
    }
  }

  return newObj as T;
};
