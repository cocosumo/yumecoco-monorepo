import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';


const fieldName : RecordKey = 'storeCode';

export const getStoreByStoreCode = async (
  storeCode: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${fieldName} = "${storeCode}"`,

}).then(({ records }) => records[0] );
