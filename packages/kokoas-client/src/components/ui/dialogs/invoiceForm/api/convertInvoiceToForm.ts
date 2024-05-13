import { IInvoiceb2b } from 'types';
import { TInvoiceForm } from '../schema';
import { parseKintoneDate } from 'kokoas-client/src/lib';
import { KInvoiceProgress } from 'types/src/common/order';

export const convertInvoiceToForm = (data: IInvoiceb2b): Partial<TInvoiceForm> => {

  return ({
    deliveryDate: parseKintoneDate(data.deliveryDate.value),
    invoiceDueDate: parseKintoneDate(data.invoiceDueDate.value),
    paymentDate: parseKintoneDate(data.paymentDate.value),
    invoiceAmount: Number(data.invoiceAmount.value),
    invoiceStatus: data.invoiceStatus.value as KInvoiceProgress,
    invoiceId: data.uuid.value,
  });
};