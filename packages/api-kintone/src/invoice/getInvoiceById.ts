
import { KInvoices } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getInvoiceById = async (
  invoiceId: string,
) => {
  if (!invoiceId) throw new Error('Invalid invoice id.');

  const idKey: KInvoices = 'uuid';

  return getRecords<RecordType>({
    app: appId,
    query: `${idKey} = "${invoiceId}"`,
  }).then(({ records }) => records[0]);
};