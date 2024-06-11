import { deleteRecords } from '../common/deleteRecords';
import { appId } from './config';

export const deleteOrderBy$Id = async (recordId: string) => {
  
  return deleteRecords({
    app: appId,
    ids: [recordId],
  });

};