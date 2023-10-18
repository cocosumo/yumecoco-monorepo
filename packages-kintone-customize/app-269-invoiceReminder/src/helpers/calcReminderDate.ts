import addDays from 'date-fns/addDays';
import { KReminderList } from '../config';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';



export const calcReminderDate = ({
  reminderDate,
  depositDate,
}: {
  reminderDate: KReminderList
  depositDate: string
}) => {

  if (reminderDate === '1日後') {
    return format(addDays(new Date(), 1), 'yyyy-MM-dd');

  } else if (reminderDate === '1週間後') {
    return format(addWeeks(new Date(), 1), 'yyyy-MM-dd');

  } else if (reminderDate === '1か月後') {
    return format(addMonths(new Date(), 1), 'yyyy-MM-dd');

  } else if (reminderDate === '3か月後') {
    return format(addMonths(new Date(), 3), 'yyyy-MM-dd');

  } else if (reminderDate === '入金予定日') {
    return depositDate;

  }

  console.error('リマインダー設定の処理更新が必要です'); // 開発者用
  return 'default';

};
