export const getDeepKeys = (obj : any) => {
  let keys: string[] = [] ;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const subkeys = getDeepKeys(obj[key]);

      keys = keys.concat(subkeys.map((subkey) => {
        return key + '.' + subkey;
      }));

    } else if (Array.isArray(obj[key])) {
      for (let i = 0;i < obj[key].length;i++) {
        const subkeys = getDeepKeys(obj[key][i]);
        keys = keys.concat(subkeys.map( (subkey) => {
          return key + '[' + i + ']' + '.' + subkey;
        }));
      }
    } else {
      keys.push(key);
    }
  }
  return keys;
};