import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { UpdateRecordParam } from '../restapi';
import { resultToStrArray } from '../helpers/utils';

export const updateCustomers = async (records : UpdateRecordParam[]) => {

  return resultToStrArray(await KintoneRecord.updateRecords({
    app: APP_ID,
    records,
  }));
};

