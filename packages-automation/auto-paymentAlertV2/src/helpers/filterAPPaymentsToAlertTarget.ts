import { IAndpadpayments } from 'types';
import { IPaymentReminder } from '../../config';
import format from 'date-fns/format';



/**
 * 通知対象の請求のみに絞り込む
 */
export const filterAPPaymentsToAlertTarget = ({
  unpaidAndpadPayments,
  reminders,
}: {
  unpaidAndpadPayments: IAndpadpayments[]
  reminders: IPaymentReminder[]
}) => {

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return unpaidAndpadPayments.reduce((acc, andpadPayment) => {
    const {
      ID,
      expectedPaymentDate,
    } = andpadPayment;

    // 既に同IDのリマインダーが存在する場合は処理行わない
    if (reminders.some(({ paymentId }) => paymentId.value === ID.value)) {
      console.log('リマインダー登録済みの入金IDのためパスします:', ID.value);
      return acc;
    }

    // 支払情報が存在しないかつ、今日以前が通知日の場合
    if (expectedPaymentDate.value <= todayStr) {
      acc?.push(andpadPayment);
    }

    return acc;

  }, [] as IAndpadpayments[]);

};
