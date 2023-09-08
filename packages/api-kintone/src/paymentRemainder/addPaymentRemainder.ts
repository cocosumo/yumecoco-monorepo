import { RecordKey, appId } from './config';
import { addAllRecords } from '../common/addAllRecords';


type AddPaymentRemainder = {
  [fieldCode: RecordKey[number]]: {
    value: unknown
  }
};

/**
 * 入金アラートレコードを一括更新する
 */
export const updatePaymentRemainder = (params: AddPaymentRemainder[]) => {

  return addAllRecords({
    app: appId,
    records: params,
  });

};
