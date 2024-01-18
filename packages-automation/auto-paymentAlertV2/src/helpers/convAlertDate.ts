import addDays from 'date-fns/addDays';

/**
 * 通知予定日と支払予定日を比較し、遅い方の日付を次回の通知日に設定する
 * @param param.scheduledAlertDate: 通知予定日
 * @param param.expectedPaymentDate: 支払予定日
 * @returns 
 */
export const convAlertDate = ({
  scheduledAlertDate,
  expectedPaymentDate,
}: {
  scheduledAlertDate: string
  expectedPaymentDate: string | null
}) => {

  // 支払予定日の翌日が通知日となる場合
  if (expectedPaymentDate && new Date(scheduledAlertDate) <= addDays(new Date(expectedPaymentDate), 1)) {
    return addDays(new Date(expectedPaymentDate), 1);
  }

  return scheduledAlertDate;
};
