import { IAndpadpayments } from 'types';
import { AndpadCsv } from '../types/types';
import { UpdateAndpadPayments } from 'api-kintone/src/andpadPayments/updateAndpadRecords';


/**
 * ANDPAD入金一覧のバッグアップと現在の状態を比較し、
 * 削除されたレコードには削除ステータスを付与します
 * @param param0 
 */
export const chkRecordCondition = ({
  unpaidBackupPayments,
  andpadPaymentsCsv,
}: {
  unpaidBackupPayments: IAndpadpayments[]
  andpadPaymentsCsv: AndpadCsv
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

  }, [] as UpdateAndpadPayments[]);


};
