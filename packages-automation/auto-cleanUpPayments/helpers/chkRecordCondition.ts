import { IAndpadpayments } from 'types';
import { UpdateAndpadPayments } from 'api-kintone/src/andpadPayments/updateAndpadPayments';
import { GetAndpadPaymentsReturn } from './getAndpadPaymentsCsv';


/**
 * ANDPAD入金一覧のバッグアップと現在の状態を比較し、
 * 削除されたレコードには削除ステータスを付与します
 * @param param0 
 * 
 * @deprecated V2に移行のため
 */
export const chkRecordCondition = ({
  unpaidBackupPayments,
  andpadPaymentsCsv,
}: {
  unpaidBackupPayments: IAndpadpayments[]
  andpadPaymentsCsv: GetAndpadPaymentsReturn
}) => {

  return unpaidBackupPayments.reduce((acc, cur) => {
    const isExist = andpadPaymentsCsv.data.some(({ ID }) => ID.toString() === cur.ID.value);

    if (!isExist) {
      acc.push({
        updateKey: {
          field: 'ID',
          value: cur.ID.value,
        },
        record: {
          deleteStatus: { value: '削除' },
        },
      });
    }

    return acc;

  }, [] as UpdateAndpadPayments);


};
