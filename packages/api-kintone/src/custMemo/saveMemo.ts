import { ktRecord } from '../client';
import { saveRecord } from '../common';
import { appId, RecordType } from './config';

export const saveMemo = async ({
  id,
  record,
}:{
  id: string,
  record: Partial<RecordType>
}) => {
  return saveRecord({
    app: appId,
    record: record,
    recordId: id,
  });
};