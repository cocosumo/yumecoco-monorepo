import { IAndpadpayments } from 'types';
import { AndpadCsv } from '../types/types';
import { produce } from 'immer';


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

  return unpaidBackupPayments.map((data) => {
    const isExist = andpadPaymentsCsv.data.some(({ ID }) => ID === data.ID.value);

    if (isExist) return data;

    const newData = produce(data, (draft) =>{
      draft.deleteStatus.value = '削除';
    });

    return newData;

  });

};
