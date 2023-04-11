import { updateAllRecords } from '../common/updateAllRecords';
import { RecordType, appId } from './config';

type UpdateInvoices = {
  records: ({
    id: string,
    record?: RecordType | undefined,
    revision?: string | undefined,
  } | {
    updateKey: string,
    record?: RecordType | undefined,
    revision?: string | undefined,
  })
};

/**
 * 請求書を一括更新する
 */
export const updateInvoices = (params: UpdateInvoices) => {

  return updateAllRecords({
    ...params,
    app: appId,
  });

};
