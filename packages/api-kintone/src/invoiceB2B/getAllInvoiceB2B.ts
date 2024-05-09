import { getAllRecords } from '../common';
import { appId, RecordType } from './config';

export type GetAllInvoiceB2BParams = Omit<Parameters<typeof getAllRecords>[0], 'app'>;

export const getAllInvoiceB2B = async (
  params?: GetAllInvoiceB2BParams,
) => getAllRecords<RecordType>({
  ...params,
  app: appId,
});