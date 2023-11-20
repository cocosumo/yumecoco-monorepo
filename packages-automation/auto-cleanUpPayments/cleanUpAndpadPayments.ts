import { getUnpaidAndpadPayments } from 'api-kintone/src/andpadPayments/getUnpaidAndpadPayments';
import { getAndpadPaymentsCsv } from './helpers/getAndpadPaymentsCsv';
import { chkRecordCondition } from './helpers/chkRecordCondition';



/**
 * 未入金の請求書に対して、現在のANDPAD請求書との比較を行う
 * 既に削除された請求書に対しては、「削除」のステータスを付与する
 */
export const cleanupAndpadPayments = () => {


};
