import { useWatch } from 'react-hook-form';
import { useInvoiceFormContext } from './useInvoiceRHF';
import { getNextInvoiceStatus } from 'api-kintone/src/invoiceB2B/helpers/getNextInvoiceStatus';

export const useNextInvoiceStatus = () => {
  const { control } = useInvoiceFormContext();
  const invoiceStatus = useWatch({
    control,
    name: 'invoiceStatus',
  });

  const nextInvoiceStatus = getNextInvoiceStatus(invoiceStatus);

  return nextInvoiceStatus;
};