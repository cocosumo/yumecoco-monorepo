export const getConstPeriod = ({
  startDate,
  finishDate,
}: {
  startDate: string
  finishDate: string
}) => {

  // 工期が設定されていない場合
  if (!startDate && !finishDate) return '';

  // 工期が開始日と終了日のどちらかしか入力されていない場合
  if (!startDate) return finishDate;
  if (!finishDate) return startDate;

  // 開始日と終了日が同日の場合
  if (startDate === finishDate) return startDate;

  return `${startDate} から ${finishDate} まで`;

};