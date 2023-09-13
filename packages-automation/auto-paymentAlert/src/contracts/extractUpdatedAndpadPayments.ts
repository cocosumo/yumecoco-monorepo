import { getAndpadPaymentsByUpdateDate } from 'api-kintone/src/andpadPayments/getAndpadPaymentsByUpdateDate';



/** 1日以内に更新されたandpadの入金情報を取得します */
export const extractUpdatedAndpadPayments = async () => {
  return (getAndpadPaymentsByUpdateDate(1, 'DAYS'));
};
