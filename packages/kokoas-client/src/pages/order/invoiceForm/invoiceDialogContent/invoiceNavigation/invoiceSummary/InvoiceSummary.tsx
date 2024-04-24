import { Stack } from '@mui/material';
import { SummaryInfo } from './SummaryInfo';
import { useInvoiceB2BByProjId } from 'kokoas-client/src/hooksQuery';
import { useInvoiceFormContext } from '../../../hooks/useInvoiceRHF';
import { useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { useItemsSummary } from '../../../hooks/useItemsSummary';


export const InvoiceSummary = () => {
  const { control } = useInvoiceFormContext();

  const [
    projId,
    orderId,  
  ] = useWatch({
    control,
    name: ['projId', 'orderId', 'items'],
  });

  const { data } = useInvoiceB2BByProjId({ projId });

  const {
    totalInvoiceAmountBeforeTax,
  } = useMemo(() => {
    if (!data || !orderId) {
      return {
        totalInvoiceAmountBeforeTax: 0,
      };
    }

    return data.reduce((acc, curr) => {
      if (curr.orderId.value !== orderId) {
        return acc;
      }

      acc.totalInvoiceAmountBeforeTax += +curr.invoiceAmount.value;

      return acc;
    }, {
      totalInvoiceAmountBeforeTax: 0,
    });
  }, [data, orderId]);

  const {
    totalAmountBeforeTax,
  } = useItemsSummary();

  return (
    <Stack
      spacing={2}
      p={2}
      // add top shadow
      boxShadow={'0px -2px 4px rgba(0, 0, 0, 0.1)'}
      zIndex={1}
      bgcolor={'#fff'}
    >
      <SummaryInfo label={'合計（税抜）'} value={totalInvoiceAmountBeforeTax} />
      <SummaryInfo label={'請求残（税抜）'} value={totalAmountBeforeTax - totalInvoiceAmountBeforeTax} />
    </Stack>
  );
};