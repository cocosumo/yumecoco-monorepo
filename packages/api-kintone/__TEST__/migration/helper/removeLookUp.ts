import { Properties } from '@kintone/rest-api-client/lib/client/types';

export const removeLookUp = (obj : Properties) => {
  return Object.entries(obj)
    .filter((tupple) => !('lookup' in tupple[1]));
};