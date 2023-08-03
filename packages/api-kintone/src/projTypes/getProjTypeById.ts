import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getProjTypeById = async (uuid: string) => {

  const idField: RecordKey = 'uuid';
  const query = `${idField}="${uuid}"`;

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records[0]);

};