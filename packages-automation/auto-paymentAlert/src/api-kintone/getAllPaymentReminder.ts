import { getAllRecords } from 'api-kintone';
import { appId, RecordType } from './config';


export const getAllPaymentReminder = async (
  params?: Omit<Parameters<typeof getAllRecords>[0], 'app'>,
) => getAllRecords<RecordType>({
  ...params,
  app: appId,
  orderBy: '作成日時 desc',
});