import { IOrder } from 'types';
import { TOrderForm, TOrderMethod } from '../schema';
import parseISO from 'date-fns/parseISO';

export const convertOrderToForm = (data: IOrder): Partial<TOrderForm> => {

  const {
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

  } = data;

  return {
    orderDataId:  orderDataId.value,
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