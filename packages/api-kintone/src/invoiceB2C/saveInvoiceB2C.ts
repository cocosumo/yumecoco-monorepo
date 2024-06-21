import { v4 } from 'uuid';
import { saveRecordByUpdateKey } from '../common/saveRecordByUpdateKey';
import { appId, RecordType } from './config';
import { generateInvoiceB2CDataId } from './generateInvoiceB2CDataId';

/**
 * 顧客請求書を保存する。
 */
export const saveInvoiceB2C = async ({
  record,
  recordId,
  revision,
}: {
  /** uuid  */
  recordId?: string,
  record: Partial<RecordType>
  revision?: string,
}) => {
  const aggRecord = { ...record };

  let parsedInvoiceB2CDataId = record.invoiceDataId?.value;

  if (!parsedInvoiceB2CDataId) {
    const { newInvoiceDataId } = await generateInvoiceB2CDataId();
    parsedInvoiceB2CDataId = newInvoiceDataId;
  }

  return saveRecordByUpdateKey({
    app: appId,
    updateKey: {
      field: 'uuid',
      value: recordId ?? v4(),
    },
    record: aggRecord,
    revision,
  });

};
