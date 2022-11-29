import { KintoneClientBasicAuth } from 'api-kintone/batch-scripts/settings';
import { RecordType, appId } from './config';


export const uploadPostalCode = async (records: RecordType[]) => {
  const ktr = KintoneClientBasicAuth.record;
  
  await ktr.addAllRecords({
    app: appId,
    records,
  });
};