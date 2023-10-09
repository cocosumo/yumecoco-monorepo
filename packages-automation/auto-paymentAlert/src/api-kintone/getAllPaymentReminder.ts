import { getAllRecords } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';


export const getAllPaymentReminder = async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<IPaymentReminder>({
  ...params,
  app: reminderAppId,
  orderBy: '作成日時 desc',
});
