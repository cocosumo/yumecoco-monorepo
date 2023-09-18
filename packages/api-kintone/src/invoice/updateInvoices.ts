import { RecordID, Revision } from '@kintone/rest-api-client/lib/src/client/types';
import { updateAllRecords } from '../common/updateAllRecords';
import { RecordType, appId } from './config';


type UpdateInvoices = {
  id: RecordID;
  record?: Partial<RecordType>
  revision?: Revision;
};

/**
 * 請求書を一括更新する
 */
export const updateInvoices = (params: UpdateInvoices[]) => {

  return updateAllRecords({
    records: params,
    app: appId,
  });

};
