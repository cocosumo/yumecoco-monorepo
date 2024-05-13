import { IInvoiceb2b } from 'types';
import { TInvoiceForm } from '../schema';
import { toKintoneDateStr } from 'kokoas-client/src/lib';
import { getNextInvoiceStatus } from 'api-kintone/src/invoiceB2B/helpers/getNextInvoiceStatus';
import { getPrevInvoiceStatus } from 'api-kintone/src/invoiceB2B/helpers/getPrevInvoiceStatus';

export const convertInvoiceToKintone = (
  data: TInvoiceForm,
  statusDirection: 'next' | 'prev' = 'next',
) : Partial<IInvoiceb2b> => {

  const {
    
    projId,
    orderId,
    supplierId,
    deliveryDate,
    invoiceDueDate,
    paymentDate,
    invoiceStatus,

  } = data;

  const resolvedStatus = statusDirection === 'next' 
    ? getNextInvoiceStatus(invoiceStatus) 
    : getPrevInvoiceStatus(invoiceStatus);

  return ({
    projId: { value: projId },
    orderId: { value: orderId },
    supplierId: { value: supplierId },
    deliveryDate: { value: toKintoneDateStr(deliveryDate) },
    invoiceDueDate: { value: toKintoneDateStr(invoiceDueDate) },
    paymentDate: { value: toKintoneDateStr(paymentDate) },
    invoiceAmount: { value: String(data.invoiceAmount) },
    invoiceStatus: { value: resolvedStatus || '未請求' },

  });

};