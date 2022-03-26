import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { UpdateRecordParam } from '../types/restapi';

export const updateGroup = async (group: UpdateRecordParam) => {

  return KintoneRecord.updateRecord({
    app: APP_ID,
    id: group.id,
    record: group.record,
    revision: group.revision,
  });
};