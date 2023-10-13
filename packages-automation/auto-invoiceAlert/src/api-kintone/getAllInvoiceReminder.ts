import { getAllRecords } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';


export const getAllInvoiceReminder = async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<IInvoiceReminder>({
  ...params,
  app: reminderAppId,
  orderBy: '作成日時 desc',
});
