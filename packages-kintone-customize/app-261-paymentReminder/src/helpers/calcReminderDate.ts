import addDays from 'date-fns/addDays';
import { reminderList } from '../config';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';



export const calcReminderDate = (reminderStr: keyof typeof reminderList) => {

  let newDate = '';
  for (const reminderKey of Object.keys(reminderList)) {
    if (reminderStr === reminderKey) {
      const reminderVal = reminderList[reminderKey];
      const number = +reminderVal.replace(/[^0-9]/g, '');
      const span = reminderVal.replace(/[0-9]/g, '');
      switch (span) {
        case 'day':
          newDate = format(addDays(new Date(), number), 'yyyy-MM-dd');
          break;
        case 'week':
          newDate = format(addWeeks(new Date(), number), 'yyyy-MM-dd');
          break;
        case 'month':
          newDate = format(addMonths(new Date(), number), 'yyyy-MM-dd');
          break;
        case 'year':
          newDate = format(addYears(new Date(), number), 'yyyy-MM-dd');
          break;
      }
      break;
    }
  }

  if (newDate === '') {
    console.error('リマインダー設定の処理更新が必要です'); // 開発者用
  }

  return newDate;
};
