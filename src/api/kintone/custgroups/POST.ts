import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { AddRecordFn, UpdateRecordParam } from '../restapi';


export const addCustGroup: AddRecordFn = (record = {}) => {

  return KintoneRecord.addRecord({ app: APP_ID, record });

};

export const updateGroup = async (group: UpdateRecordParam) => {
  return KintoneRecord.updateRecord({
    app: APP_ID,
    id: group.id,
    record: group.record,
    revision: group.revision,
  });
};






