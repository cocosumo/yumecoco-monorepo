import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';



export const formatDate = (date: string) => {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'yyyy年M月d日');
};


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
  if (!startDate) return formatDate(finishDate);
  if (!finishDate) return formatDate(startDate);

  // 開始日と終了日が同日の場合
  if (startDate === finishDate) return formatDate(startDate);

  return `${formatDate(startDate)} から ${formatDate(finishDate)} まで`;

};