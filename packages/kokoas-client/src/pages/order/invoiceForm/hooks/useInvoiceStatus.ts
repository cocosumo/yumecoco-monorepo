import { useWatch } from 'react-hook-form';
import { useInvoiceFormContext } from './useInvoiceRHF';
import { getNextInvoiceStatus } from 'api-kintone/src/invoiceB2B/helpers/getNextInvoiceStatus';
import { getPrevInvoiceStatus } from 'api-kintone/src/invoiceB2B/helpers/getPrevInvoiceStatus';

export const useInvoiceStatus = () => {
  const { control } = useInvoiceFormContext();
  const [
    invoiceStatus,
  ] = useWatch({
    control,
    name: [
      'invoiceStatus',
    ],
  });

  const nextInvoiceStatus = getNextInvoiceStatus(invoiceStatus);
  const prevInvoiceStatus = getPrevInvoiceStatus(invoiceStatus);

  return {
    current: invoiceStatus,
    prev: prevInvoiceStatus,
    next: nextInvoiceStatus,
  };
};