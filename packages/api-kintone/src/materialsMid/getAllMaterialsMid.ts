import { ktRecord } from '../client';
import { appId, RecordKey, RecordType } from './config';

export const getAllMaterialsMid = async () => {
  const orderKey : RecordKey = 'furigana';
  return (await ktRecord()).getAllRecords({
    app: appId,
    orderBy: `${orderKey} asc`,
    withCursor: false,
  }).then((recs) => recs as unknown as RecordType[] );
};