import { RecordKey } from './config';
import { getAllCustGroups } from './getAllCustGroups';


/**
 * Searches for customer groups by keyword.
 * @param params - The options object.
 * @param params.keyword - The keyword to search for.
 * @returns  A promise that resolves to an array of customer groups.
 * 
 * ただし、kintoneの制限により、一文字で検索するとヒットしない場合がある。
 * @see https://www.ait-labo.com/kintone-basic/2690/
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
  
  let condition = '';
  if (keyword) {
    condition = keywordKeys
      .map((field) => `${field} like "${keyword}"`)
      .join(' or ');
  
  }
   

  return getAllCustGroups({
    condition:  condition,
    orderBy: '作成日時 asc',
  });
  
};