export function removeKeys(obj: object, keys: string[]) {
  const newObj = JSON.parse(JSON.stringify(obj));

  for (const prop in newObj) {
    if (prop in newObj) {
      switch (typeof(newObj[prop])) {
        case 'object':
          if (keys.indexOf(prop) > -1) {
            delete newObj[prop];
          } else {
            removeKeys(newObj[prop], keys);
          }
          break;
        default:
          if (keys.indexOf(prop) > -1) {
            delete newObj[prop];
          }
          break;
      }
    }
  }

  return newObj;
}