import { getActiveUnissuedInvoiceAlertsByAlertDate } from 'api-kintone/src/unissuedInvoiceAlert/getActiveUnissuedInvoiceAlertsByAlertDate';


/** 今日以前が通知予定日になっているリマインダーレコードを取得する */
export const getUnissuedInvReminderRecByAlertDate = async () => {

  const alertDate = new Date();

  const reminderRec = await getActiveUnissuedInvoiceAlertsByAlertDate(alertDate);

  return reminderRec;
};
