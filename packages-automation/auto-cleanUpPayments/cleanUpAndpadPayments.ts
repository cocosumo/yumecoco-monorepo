import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { getAndpadPaymentsCsv } from './helpers/getAndpadPaymentsCsv';
import { chkRecordCondition } from './helpers/chkRecordCondition';
import { updateAndpadPayments } from 'api-kintone/src/andpadPayments/updateAndpadPayments';



/**
 * 未入金の請求書に対して、現在のANDPAD請求書との比較を行う
 * 既に削除された請求書に対しては、「削除」のステータスを付与する
 * 
 * @deprecated V2へ移行のため
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

  await updateAndpadPayments(kintoneUpdateRecords);

  
  console.log('finish cleanup andpad payments');
};
