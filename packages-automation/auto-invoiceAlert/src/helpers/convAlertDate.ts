
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

  if (expectedPaymentDate 
    && new Date(scheduledAlertDate).getTime() <= new Date(expectedPaymentDate).getTime()) {
    return expectedPaymentDate;
  }

  return scheduledAlertDate;
};
