/**
 * Remove nullish and unidentified values from an object.
 */
export const filterNonNull = <T extends object>(obj: T) => {
  return Object
    .fromEntries(
      Object
        .entries(obj)
        .filter(([_, v]) => typeof v === 'number' || typeof v === 'boolean' || v),
    );
};
