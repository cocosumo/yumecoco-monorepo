export const locationSorter = <T extends [string, any]>([a]: T, [b]: T)=>{
  return a === '他' ? 0 : a.localeCompare(b);
};
