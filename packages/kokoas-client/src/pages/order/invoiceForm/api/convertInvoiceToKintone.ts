import { IInvoiceb2b } from 'types';
import { TInvoiceForm } from '../schema';
import { toKintoneDateStr } from 'kokoas-client/src/lib';
import { getNextInvoiceStatus } from 'api-kintone/src/invoiceB2B/helpers/getNextInvoiceStatus';

export const convertInvoiceToKintone = (data: TInvoiceForm ) : Partial<IInvoiceb2b> => {

  const {
    
    projId,
    orderId,
    supplierId,
    deliveryDate,
    invoiceDueDate,
    paymentDate,

    invoiceStatus,
  } = data;

  return ({
    projId: { value: projId },
    orderId: { value: orderId },
    supplierId: { value: supplierId },
    deliveryDate: { value: toKintoneDateStr(deliveryDate) },
    invoiceDueDate: { value: toKintoneDateStr(invoiceDueDate) },
    paymentDate: { value: toKintoneDateStr(paymentDate) },
    invoiceAmount: { value: String(data.invoiceAmount) },
    invoiceStatus: { value: getNextInvoiceStatus(invoiceStatus) },


  });

};