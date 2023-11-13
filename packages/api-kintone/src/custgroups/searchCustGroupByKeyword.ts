import { RecordKey } from './config';
import { getAllCustGroups } from './getAllCustGroups';


/**
 * Searches for customer groups by keyword.
 * @param params - The options object.
 * @param params.keyword - The keyword to search for.
 * @returns  A promise that resolves to an array of customer groups.
 */
export const searchCustGroupByKeyword = async ({
  keyword,
}:{
  keyword: string
}) => {

  const keywordKeys : RecordKey[] = [
    'customerName',
    'custNameReading',
  ];
   

  return getAllCustGroups({
    condition: keywordKeys
      .map((field) => `${field} like "${keyword}"`)
      .join(' or '),
  });
  
};