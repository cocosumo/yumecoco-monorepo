import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { getAndpadPaymentsCsv } from './helpers/getAndpadPaymentsCsv';
import { chkRecordConditionV2 } from './helpers/chkRecordConditionV2';
import { deleteAndpadPayments } from 'api-kintone/src/andpadPayments/deleteAndpadPayments';



/**
 * 未入金の請求書に対して、現在のANDPAD請求書との比較を行う
 * 既に削除されている請求書は、バックアップ側でも削除する
 */
export const cleanUpAndpadPaymentsV2 = async () => {
  console.log('start cleanup andpad payments');

  // 未入金の請求書を取得する
  const unpaidBackupPayments = await getUnpaidAndpadPayments();

  // ANDPADの入金一覧情報csvデータを取得する
  const andpadPaymentsCsv = getAndpadPaymentsCsv();

  const deleteRecordIDs = chkRecordConditionV2({
    unpaidBackupPayments: unpaidBackupPayments,
    andpadPaymentsCsv: andpadPaymentsCsv,
  });

  await deleteAndpadPayments(deleteRecordIDs);

  
  console.log('finish cleanup andpad payments');
};
