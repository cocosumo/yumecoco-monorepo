import { KintoneRecord } from '../config';
import { RecordParam } from '../restapi';
import { APP_ID } from './config';




export const addMemo = (record: CustomerMemoTypes.SavedData  ) => {

  return KintoneRecord.addRecord({ app: APP_ID, record: record as unknown as RecordParam });
};