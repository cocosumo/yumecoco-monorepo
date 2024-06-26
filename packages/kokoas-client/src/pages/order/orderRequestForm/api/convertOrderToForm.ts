import { IOrder } from 'types';
import { TOrderForm } from '../schema';
import parseISO from 'date-fns/parseISO';
import { TOrderMethod } from 'types/src/common/order';

export const convertOrderToForm = (data: IOrder): Partial<TOrderForm> => {

  const {
    uuid,
    projId,
    orderDataId,
    supplierId,
    supplierName,
    orderName,
    orderMethod,
    supplierOfficerId,
    supplicerOfficerName,
    supplierOfficerTel,
    supplierOfficerEmail,
    emailCc,
    emailBcc,
    remarks,
    expectedDeliveryDate,
    $id,
  } = data;

  return {
    orderId: uuid.value,
    orderRecordId: $id.value,
    orderDataId:  orderDataId.value,
    projId: projId.value,
    supplierId: supplierId.value,
    supplierName: supplierName.value,
    orderName: orderName.value || '',
    orderMethod: orderMethod.value as TOrderMethod,
    supplierOfficerId: supplierOfficerId.value,
    supplierOfficerName: supplicerOfficerName.value,
    supplierOfficerTel: supplierOfficerTel.value,
    supplierOfficerEmail: supplierOfficerEmail.value,
    emailCc: emailCc.value,
    emailBcc: emailBcc.value,
    remarks: remarks.value,
    expectedDeliveryDate: expectedDeliveryDate.value ? parseISO(expectedDeliveryDate.value) : null,
  };
};