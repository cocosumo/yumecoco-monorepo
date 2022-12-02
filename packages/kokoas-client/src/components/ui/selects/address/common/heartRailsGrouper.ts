import { getKanaRow } from 'kokoas-client/src/helpers/utils';

/** Group the api result from heartrails by first character.  */
export const heartRailsGrouper = (
  accu: { [char: string]: Record<string, string>[] }, 
  curr: Record<string, string>, 
  groupKey: keyof typeof curr)=>{
  let firstChar = curr[groupKey].charAt(0);

  firstChar = firstChar === '(' ? '他' : getKanaRow(firstChar);

  return { 
    ...accu, 
    [firstChar]: [
      ...accu?.[firstChar] ?? [], 
      curr,
    ], 
  };
};