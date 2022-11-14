import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getProjTypeById = async (id: string) => {
  const KintoneRecord = await ktRecord();
 
  const { records } = await KintoneRecord.getRecords({
    app: appId,
    query: `$id = "${id}"`,

  });

  if (records.length === 0) throw new Error('Not found.');
  if (records.length > 1) throw new Error(`${records.length} duplicates Found.`);

  return records[0] as unknown as RecordType;


};