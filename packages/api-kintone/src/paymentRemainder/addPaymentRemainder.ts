import { RecordType, appId } from './config';
import { addAllRecords } from '../common/addAllRecords';


type AddPaymentRemainder = {
  records?: Partial<RecordType>
};


/**
 * 入金アラートレコードを一括更新する
 */
export const updatePaymentRemainder = (params: AddPaymentRemainder[]) => {

  return addAllRecords({
    app: appId,
    params,
  });

};
