
/**
 * kintoneアプリで設定しているリマインダー選択肢
 * keyにはkintoneアプリで設定している選択肢をそのまま設定する
 * valueには数字+日付の単位(day,week,month,year)を設定すること
 */
export const reminderList = {
  '-----': 'default',
  '1日後': '1day',
  '1週間後': '1week',
  '1か月後': '1month',
  '3か月後': '3month',
  '入金予定日': 'depositDate',
};

export type KReminderList = keyof typeof reminderList;
