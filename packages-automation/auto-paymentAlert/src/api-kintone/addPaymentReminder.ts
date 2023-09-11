import { addAllRecords } from 'api-kintone';
import { RecordKey, appId } from './config';


type AddPaymentReminder = {
  [fieldCode: RecordKey[number]]: {
    value: unknown
  }
};

/**
 * 入金アラートレコードを一括更新する
 */
export const updatePaymentReminder = (params: AddPaymentReminder[]) => {

  return addAllRecords({
    app: appId,
    records: params,
  });

};
