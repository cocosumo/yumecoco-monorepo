import { addRecords } from 'api-kintone';
import { appId } from './config';
import { IPaymentReminder } from '../../config';


/**
 * 入金アラートレコードを一括登録する
 */
export const addPaymentReminder = (params: Partial<IPaymentReminder>[]) => {

  return addRecords({
    app: appId,
    records: params,
  });

};
