import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { getAndpadPaymentsCsv } from './helpers/getAndpadPaymentsCsv';
import { chkRecordCondition } from './helpers/chkRecordCondition';
import { updateAndpadRecords } from 'api-kintone/src/andpadPayments/updateAndpadRecords';



/**
 * 未入金の請求書に対して、現在のANDPAD請求書との比較を行う
 * 既に削除された請求書に対しては、「削除」のステータスを付与する
 */
export const cleanupAndpadPayments = async () => {
  console.log('start cleanup andpad payments');

  // 未入金の請求書を取得する
  const unpaidBackupPayments = await getUnpaidAndpadPayments();

  // ANDPADの入金一覧情報csvデータを取得する
  const andpadPaymentsCsv = getAndpadPaymentsCsv();

  const kintoneUpdateRecords = chkRecordCondition({
    unpaidBackupPayments: unpaidBackupPayments,
    andpadPaymentsCsv: andpadPaymentsCsv,
  });

  await updateAndpadRecords(kintoneUpdateRecords);

  
  console.log('finish cleanup andpad payments');
};
