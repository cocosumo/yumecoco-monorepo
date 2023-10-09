import addDays from 'date-fns/addDays';
import { KReminderList, reminderList } from '../config';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';



export const calcReminderDate = (reminderStr: KReminderList) => {


  for (const reminderKey of Object.keys(reminderList)) {
    if (reminderStr === reminderKey) {
      const reminderVal = reminderList[reminderKey];
      const number = +reminderVal.replace(/[^0-9]/g, '');
      const span = reminderVal.replace(/[0-9]/g, '');
      switch (span) {
        case 'day':
          return format(addDays(new Date(), number), 'yyyy-MM-dd');

        case 'week':
          return format(addWeeks(new Date(), number), 'yyyy-MM-dd');

        case 'month':
          return format(addMonths(new Date(), number), 'yyyy-MM-dd');

        case 'year':
          return format(addYears(new Date(), number), 'yyyy-MM-dd');

        case 'default':
          return 'default';

        default:
          break;
      }
    }
  }

  console.error('リマインダー設定の処理更新が必要です'); // 開発者用
  return 'default';

};
