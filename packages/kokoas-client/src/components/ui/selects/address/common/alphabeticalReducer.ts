import { getKanaRow } from 'kokoas-client/src/helpers/utils';

export const alphabeticalReducer = (
  accu: { [char: string]: Record<string, string>[] }, 
  curr: Record<string, string>, 
  groupKey: keyof typeof curr)=>{
  let firstChar = curr[groupKey].charAt(0);

  firstChar = firstChar === '(' ? firstChar = '他' : getKanaRow(firstChar);

  return { 
    ...accu, 
    [firstChar]: [
      ...accu?.[firstChar] ?? [], 
      curr,
    ], 
  };
};