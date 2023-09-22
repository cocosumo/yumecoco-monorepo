import { addRecords } from 'api-kintone';
import { RecordKey, appId } from './config';


export type AddPaymentReminder = {
  [fieldCode: RecordKey[number]]: {
    value: unknown
  }
};

/**
 * 入金アラートレコードを一括登録する
 */
export const addPaymentReminder = (params: AddPaymentReminder[]) => {

  return addRecords({
    app: appId,
    records: params,
  });

};
