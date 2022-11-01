import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { AddRecordFn } from '../types/restapi';

/**
 * 
 * @param record 
 * @deprecated use ../saveCustGroup instead
 */
export const addCustGroup: AddRecordFn = (record = {}) => {

  return KintoneRecord.addRecord({ app: APP_ID, record });

};





