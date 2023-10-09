export function removeNullFalsyEmptyFromObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (value !== null && value !== undefined && value !== false && value !== '') {
      /*       if (Array.isArray(value) && value.length === 0) {
        continue;
      } */

      result[key] = value;
    }
  }

  return result;
}