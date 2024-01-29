import addDays from 'date-fns/addDays';


/** アラート判定用 経過日数 */
export const numOfDaysUntilAlert = {
  createDate: 10, // 作成日からアラートまでの経過日数
  expectedPaymentDate: 4, // 支払予定日からアラートまでの経過日数
};

/** アラート開始日を算出して返す */
export const calcAlertStartDate = ({
  createDate,
  expectedPaymentDate,
}: {
  createDate: string
  expectedPaymentDate: string | null
}) => {

  const alertDateFromCreationDate = addDays(new Date(createDate), numOfDaysUntilAlert.createDate);

  if (!expectedPaymentDate) {
    return alertDateFromCreationDate;
  }

  return addDays(new Date(expectedPaymentDate), numOfDaysUntilAlert.expectedPaymentDate);

};
