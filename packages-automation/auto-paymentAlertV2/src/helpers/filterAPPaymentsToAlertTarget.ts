import { IAndpadpayments, IProjects } from 'types';
import { IPaymentReminder } from '../../config';
import format from 'date-fns/format';



/**
 * 未入金の請求書を通知対象の請求のみに絞り込む
 */
export const filterAPPaymentsToAlertTarget = ({
  unpaidAndpadPayments,
  reminders,
  allProjects,
}: {
  unpaidAndpadPayments: IAndpadpayments[]
  reminders: IPaymentReminder[]
  allProjects: IProjects[]
}) => {

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  console.log('unpaidAndpadPayments', unpaidAndpadPayments.length);

  return unpaidAndpadPayments.reduce((acc, andpadPayment) => {
    const {
      ID,
      expectedPaymentDate,
      systemId,
      projId,
    } = andpadPayment;

    // 既に同IDのリマインダーが存在する場合は処理を行わない
    if (reminders.some(({ paymentId }) => paymentId.value === ID.value)) {
      console.log('リマインダー登録済みの入金IDのためパスします:', ID.value);
      return acc;
    }

    // ANDPADとココアスの接続がされていない場合は処理を行わない
    const connectedToAndpad = allProjects.some(({
      forceLinkedAndpadSystemId,
      uuid,
    }) => (forceLinkedAndpadSystemId.value === systemId.value) || (projId.value === uuid.value));

    console.log('対象工事の情報', systemId.value, projId.value, 'connectedToAndpad', connectedToAndpad);

    if (!connectedToAndpad) return acc;


    // 大黒さん案件の場合は処理を行わない
    const isDaikokuProj = allProjects.some(({
      uuid,
      ledgerInfo,
    }) => (uuid.value === projId.value && ledgerInfo.value === '大黒さん'));
    if (isDaikokuProj) return acc;

    // 今日より前が通知日の場合
    if (expectedPaymentDate.value < todayStr) {
      acc?.push(andpadPayment);
    }
    console.log('通知対象？', expectedPaymentDate, expectedPaymentDate.value < todayStr);

    return acc;

  }, [] as IAndpadpayments[]);

};
