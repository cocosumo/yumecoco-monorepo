import addDays from 'date-fns/addDays';
import { KInvoiceReminderList } from '../config';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';



export const calcInvoiceReminderDate = ({
  reminderDate,
  expectedCreateInvoiceDate,
}: {
  reminderDate: KInvoiceReminderList
  expectedCreateInvoiceDate: string
}) => {

  if (reminderDate === '1日後') {
    return format(addDays(new Date(), 1), 'yyyy-MM-dd');

  } else if (reminderDate === '1週間後') {
    return format(addWeeks(new Date(), 1), 'yyyy-MM-dd');

  } else if (reminderDate === '1か月後') {
    return format(addMonths(new Date(), 1), 'yyyy-MM-dd');

  } else if (reminderDate === '3か月後') {
    return format(addMonths(new Date(), 3), 'yyyy-MM-dd');

  } else if (reminderDate === '請求書作成予定日') {
    return expectedCreateInvoiceDate;

  }

  console.error('請求書リマインダー設定の処理更新が必要です'); // 開発者用
  return 'default';

};
