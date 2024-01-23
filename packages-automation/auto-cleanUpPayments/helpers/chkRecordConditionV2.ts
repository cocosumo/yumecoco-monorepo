import { IAndpadpayments } from 'types';
import { GetAndpadPaymentsReturn } from './getAndpadPaymentsCsv';


/**
 * ANDPAD入金一覧のバッグアップと現在の状態を比較し、
 * 削除されたレコードは、バックアップ側でも削除します
 * @param param0 
 */
export const chkRecordConditionV2 = ({
  unpaidBackupPayments,
  andpadPaymentsCsv,
}: {
  unpaidBackupPayments: IAndpadpayments[]
  andpadPaymentsCsv: GetAndpadPaymentsReturn
}) => {

  return unpaidBackupPayments.reduce((acc, cur) => {
    const isExist = andpadPaymentsCsv.data.some(({ ID }) => ID.toString() === cur.ID.value);

    if (!isExist) {
      acc.push(cur.$id.value);
    }

    return acc;

  }, [] as string[]);


};
