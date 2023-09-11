import { appId } from '../src/constants';
import { getFirstAndLastDay } from './getFirstAndLastDay';

export const getContractRecords = async (
  year: number, 
  month: number, 
  store: string,
) : Promise<{
  records: Array<DB.SavedRecord>,
  totalCount: number,
}> => {
  const {
    firstDay,
    lastDay,
  } = getFirstAndLastDay(year, month);
  
  const query = `contractDate >= "${firstDay}" and contractDate <= "${lastDay}" and storeId = "${store}" order by contractDate asc `;
    
  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    {
      app: appId,
      query: query,
    },
  );
  
};