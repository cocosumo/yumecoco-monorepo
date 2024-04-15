import { IOrder } from 'types';
import { TOrderForm } from '../schema';

/**
 * 発注明細DB形に変換する。
 */
export const convertOrderInfoToKintone = (data: TOrderForm) => {
  const {
    supplierId,
    supplierName,
    orderName,
    orderMethod,
    
    supplierOfficerEmail,
    emailCc,
    emailBcc,
    projId,
  } = data;

  const kintoneRecord: Partial<IOrder> = {
    projId: { value: projId },
    supplierId: { value: supplierId },
  };

  return kintoneRecord;
};