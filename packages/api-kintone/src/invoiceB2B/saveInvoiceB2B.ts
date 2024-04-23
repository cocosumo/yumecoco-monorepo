import { v4 } from 'uuid';
import { ktRecord } from '../client';
import { appId, RecordType } from './config';

/**
 * 業者から請求書を保存する。
 *
 * 関連情報：
 * order 1-n invoiceB2B
 */
export const saveInvoiceB2B = async ({
  record,
  recordId,
  revision,
}:{

  /** uuid  */
  recordId?: string,

  record: Partial<RecordType>

  revision?: string,
}) => {

  const parsedRecordId = recordId || v4();



  const KintoneRecord = await ktRecord();

  const result = await KintoneRecord.upsertRecord({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: parsedRecordId,
    },
    record: record,
    revision: revision,
  });

  return {
    ...result,
    recordId: parsedRecordId,
  };
};


// params
export type SaveInvoiceParams = Parameters<typeof saveInvoiceB2B>[0];