import { updateAllRecords } from '../common/updateAllRecords';
import { appId } from './config';

/**
 * 請求書を一括更新する
 */
export const updateInvoices = (params) => {

  return updateAllRecords({
    ...params,
    app: appId,
  });

};

