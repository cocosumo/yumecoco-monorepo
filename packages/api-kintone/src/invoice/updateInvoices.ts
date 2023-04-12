import { updateAllRecords } from '../common/updateAllRecords';
import { appId } from './config';
/* 
type UpdateInvoices = {
  records: ({
    id: RecordID;
    record?: Partial<RecordType> | undefined;
    revision?: string | undefined;
  } | {
    updateKey: string;
    record?: Partial<RecordType> | undefined;
    revision?: string | undefined;
  })[];
}; */

/**
 * 請求書を一括更新する
 */
export const updateInvoices = (params) => {

  return updateAllRecords({
    records : params,
    app: appId,
  });

};
