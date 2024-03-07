import { IUnissuedinvoicealert } from 'types';
import { updateUnissuedInvoiceAlert } from 'api-kintone/src/unissuedInvoiceAlert/updateUnissuedInvoiceAlert';
import { convertReminderToKintone } from './convertReminderToKintone';


/** 通知済みのリマインダーレコードを更新する */
export const updateReminders = async ({
  recReminders,
}: {
  recReminders: IUnissuedinvoicealert[]
}) => {

  const updateRecords = convertReminderToKintone({ recReminders });

  await updateUnissuedInvoiceAlert(updateRecords);

};
