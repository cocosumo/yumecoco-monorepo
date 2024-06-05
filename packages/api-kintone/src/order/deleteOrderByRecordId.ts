import { deleteRecords } from '../common/deleteRecords';
import { appId } from './config';

export const deleteOrderByRecordId = async (recordId: string) => {
  
  return deleteRecords({
    app: appId,
    ids: [recordId],
  });

};