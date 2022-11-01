import { KintoneRecord } from '../config';
import { RecordParam } from '../types/restapi';
import { APP_ID } from './config';




export const updateMemo = (record:  Partial<CustomerMemoTypes.SavedData>  ) => {
  /* record is forced type, will fix this later 2022.02.21  */
  return KintoneRecord.updateRecord({ app: APP_ID, id: record.$id!.value, record: record as unknown as RecordParam });
};