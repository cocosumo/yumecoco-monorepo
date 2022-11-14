import { ktRecord } from '../client';
import { appId, RecordType } from './config';

export const getAllMaterialsItem = async () => {
  return (await ktRecord()).getAllRecords({
    app: appId,
    withCursor: false,
  }).then((recs) => recs as unknown as RecordType[] );
};