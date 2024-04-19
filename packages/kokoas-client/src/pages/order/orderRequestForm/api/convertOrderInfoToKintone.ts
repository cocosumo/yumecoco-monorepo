import { IOrder } from 'types';
import { TOrderForm } from '../schema';
import { toKintoneDateStr } from 'kokoas-client/src/lib';

/**
 * 発注明細DB形に変換する。
 */
export const convertOrderInfoToKintone = (data: TOrderForm, status?: string) => {
  const {
    supplierId,
    orderName,
    orderMethod,
    orderDataId,
    supplierOfficerId,
    emailCc,
    emailBcc,
    projId,
    expectedDeliveryDate,
    remarks,
  } = data;

  const kintoneRecord: Partial<IOrder> = {
    projId: { value: projId },
    supplierId: { value: supplierId },
    orderDataId: { value: orderDataId },
    orderName: { value: orderName || '' },
    orderMethod: { value: orderMethod },
    supplierOfficerId: { value: supplierOfficerId },
    emailCc: { value: emailCc || '' },
    emailBcc: { value: emailBcc || '' },
    expectedDeliveryDate: { value: toKintoneDateStr(expectedDeliveryDate) },
    remarks: { value: remarks || '' },
    status: status ? { value: status } : undefined, // undefinedの場合は更新しない
  };

  return kintoneRecord;
};