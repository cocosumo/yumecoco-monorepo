import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { UpdateRecordParam } from '../restapi';

export const updateCustomers = async (records : UpdateRecordParam[]) => {


  return KintoneRecord.updateRecords({
    app: APP_ID,
    records,
  });
};

