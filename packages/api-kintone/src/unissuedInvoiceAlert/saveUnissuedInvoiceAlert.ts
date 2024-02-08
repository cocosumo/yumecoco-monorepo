import { saveRecord } from '../common';
import { RecordType, appId } from './config';


export const saveUnissuedInvoiceAlert = (
  {
    record,
    revision,
  }:
  {
    record: Partial<RecordType>,
    revision?: string,
  },
) => {
  const newRecord = { ...record };


  return saveRecord({
    app: appId,
    record: newRecord,
    revision,
  });

};
