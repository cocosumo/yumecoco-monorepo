import { RecordKey } from './config';
import { getAllCustGroups } from './getAllCustGroups';


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