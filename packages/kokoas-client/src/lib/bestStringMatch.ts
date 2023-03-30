import stringSimilarity from 'string-similarity';

interface BestStringMatchOptions <T extends Readonly<string[]>> {
  valueIfNoMatch?: T[number],
  /** compareArrayのstringから無視する。正確率を上げるために。 */
  ignore?: string,
}

/**
 * Returns the closest match to a given string from an array of strings, using the string-similarity library.
*/
export const bestStringMatch = <T extends Readonly<string[]>>(
  mainString: string,
  compareArray: T,
  options?: BestStringMatchOptions<T>,
) => {
  const {
    ignore,
    valueIfNoMatch,
  } = options || {};

  const {
    bestMatch : {
      rating,
      target,
    },
  } = stringSimilarity
    .findBestMatch(
      ignore ? mainString.replaceAll(ignore, '') : mainString,
      [...compareArray],
    );
  
  return (rating ? target : valueIfNoMatch) as T[number];
};