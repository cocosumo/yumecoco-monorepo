import { describe, it, expect } from '@jest/globals';
import { calcReminderDate } from './calcReminderDate';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';


describe('calcReminderDate', () => {
  it('1日後の日付を返すこと', () => {

    const result = calcReminderDate({
      depositDate: '2000-01-01',
      reminderDate: '1日後',
    });

    expect(result).toBe(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    console.log('result', result);
  }, 60000);


  it('1週間後の日付を返すこと', () => {

    const result = calcReminderDate({
      depositDate: '2000-01-01',
      reminderDate: '1週間後',
    });

    expect(result).toBe(format(addWeeks(new Date(), 1), 'yyyy-MM-dd'));
  }, 60000);


  it('1か月後の日付を返すこと', () => {

    const result = calcReminderDate({
      depositDate: '2000-01-01',
      reminderDate: '1か月後',
    });

    expect(result).toBe(format(addMonths(new Date(), 1), 'yyyy-MM-dd'));
  }, 60000);


  it('3か月後の日付を返すこと', () => {

    const result = calcReminderDate({
      depositDate: '2000-01-01',
      reminderDate: '3か月後',
    });

    expect(result).toBe(format(addMonths(new Date(), 3), 'yyyy-MM-dd'));
  }, 60000);


  it('"default"を返すこと', () => {

    const result = calcReminderDate({
      depositDate: '2000-01-01',
      reminderDate: '-----',
    });

    expect(result).toBe('default');
    console.log('result', result);
  }, 60000);

  it('入金予定日を返すこと', () => {

    const result = calcReminderDate({
      depositDate: '2000-01-01',
      reminderDate: '入金予定日',
    });

    expect(result).toBe('2000-01-01');
    console.log('result', result);
  }, 60000);
});
