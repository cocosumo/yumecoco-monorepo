
/**
 * kintoneアプリで設定しているリマインダー選択肢
 * kintoneアプリで設定している選択肢をそのまま設定すること
 */
export const reminderList = ['1日後', '1週間後', '1か月後', '3か月後', '入金予定日'] as const;

export type KReminderList = typeof reminderList[number];
