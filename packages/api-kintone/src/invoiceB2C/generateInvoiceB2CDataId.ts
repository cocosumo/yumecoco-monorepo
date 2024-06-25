import format from 'date-fns/format';
import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';



export const invoiceB2CDataIdmaxPadding = 4;

export const generateInvoiceB2CDataId = async () => {
  const invoiceDataIdKey: RecordKey = 'invoiceDataId';
  const fields: RecordKey[] = [invoiceDataIdKey];
  const formattedDateToday = format(new Date(), 'yyMMdd'); 

  const query = `${invoiceDataIdKey} like "${formattedDateToday}" order by ${invoiceDataIdKey} desc limit 1`;
  const { records } = await getRecords<RecordType>({
    app: appId,
    query,
    fields: fields,
  });

  const latestRecord = records?.[0];

  const latestInvoiceB2CDataId = latestRecord?.invoiceDataId?.value.slice(-invoiceB2CDataIdmaxPadding);
  const incrementedId = Number(latestInvoiceB2CDataId?.slice(-invoiceB2CDataIdmaxPadding) ?? 0) + 1;
  const paddedId = incrementedId.toString().padStart(invoiceB2CDataIdmaxPadding, '0');
  
  // kintone's like query will not work if search terms are not separated by "-" or space.
  const newInvoiceDataId = `${formattedDateToday}-${paddedId}`;

  return {
    newInvoiceDataId,
    latestRecord,
  }; 
};
