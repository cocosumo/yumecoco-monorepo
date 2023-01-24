import { KintoneClientBasicAuth } from 'api-kintone/scripts/batch/settings';
import { RecordType, appId } from './config';


export const uploadPostalCode = async (records: RecordType[]) => {
  const ktr = KintoneClientBasicAuth.record;

  await ktr.addAllRecords({
    app: appId,
    records,
  });
};