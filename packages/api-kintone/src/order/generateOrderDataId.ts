import format from 'date-fns/format';
import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';

export const orderDataIdmaxPadding = 4;
export const generateOrderDataId = async () => {
  const orderDataIdKey: RecordKey = 'orderDataId';
  const fields: RecordKey[] = [orderDataIdKey];
  const formattedDateToday = format(new Date(), 'yyMMdd'); 

  const query = `${orderDataIdKey} like "${formattedDateToday}" order by ${orderDataIdKey} desc limit 1`;
  const { records } = await getRecords<RecordType>({
    app: appId,
    query,
    fields: fields,
  });

  const latestRecord = records?.[0];

  const latestOrderDataId = latestRecord?.orderDataId?.value.slice(-orderDataIdmaxPadding);
  const incrementedId = Number(latestOrderDataId?.slice(-orderDataIdmaxPadding) ?? 0) + 1;
  const paddedId = incrementedId.toString().padStart(orderDataIdmaxPadding, '0');
  
  // kintone's like query will not work if search terms are not separated by "-" or space.
  const newOrderDataId = `${formattedDateToday}-${paddedId}`;

  return {
    newOrderDataId,
    latestRecord,
  }; 
};
