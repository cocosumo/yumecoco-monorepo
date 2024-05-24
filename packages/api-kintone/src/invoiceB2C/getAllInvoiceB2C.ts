import { getAllRecords } from '../common';
import { appId, RecordType } from './config';

export type getAllInvoiceB2CParams = Omit<Parameters<typeof getAllRecords>[0], 'app'>;

export const getAllInvoiceB2C = async (
  params?: getAllInvoiceB2CParams,
) => getAllRecords<RecordType>({
  ...params,
  app: appId,
});