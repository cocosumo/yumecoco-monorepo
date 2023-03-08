
type UnknownRecord = Record<string, unknown>;

/**
 * Immutably parse "true" and "false" strings into their respective boolean values.
 */
export const parseBoolean =  <T extends UnknownRecord>(
  obj: T,
): UnknownRecord => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === 'true') {
        return [key, true];
      } else if (value === 'false') {
        return [key, false];
      }
      return [key, value];
    }),
  );
};