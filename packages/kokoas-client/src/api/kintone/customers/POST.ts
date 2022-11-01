import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { RecordParam, UpsertRecordResult } from '../types/restapi';



export const addCustomer = (record: RecordParam = {}): Promise<UpsertRecordResult> => {

  return KintoneRecord.addRecord({ app: APP_ID, record });

};

/**
 * Adds multiple customers to an app.
 *
 * @param records
 * @returns an array of objects that include id and revision of created records.
 */
export const addCustomers = async (records: RecordParam[]) => {
  if (records.length === 0) throw new Error('Array is empty.' + records );

  return KintoneRecord.addRecords({ app: APP_ID, records });
};



