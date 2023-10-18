
/**
 * kintoneアプリで設定しているリマインダー選択肢
 * kintoneアプリで設定している選択肢をそのまま設定すること
 */
export const invoiceReminderList = ['1日後', '1週間後', '1か月後', '3か月後', '請求書作成予定日'] as const;

export type KInvoiceReminderList = typeof invoiceReminderList[number];
