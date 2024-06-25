import { Stack } from '@mui/material';
import { SaveInvoice } from './SaveInvoice';
import { IssueInvoice } from './IssueInvoice';
import { DeleteInvoice } from './DeleteInvoice';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useMemo } from 'react';



export const Actions = () => {
  const [
    invoiceId,
    invoiceStatus,
    paymentStatus,
  ] = useTypedWatch({
    name: [
      'invoiceId',
      'invoiceStatus',
      'paymentStatus',
    ],
  }) as [string, string, string];

  const isInvoiceIssued = invoiceStatus === '発行済';
  const hasPayment = useMemo(() => {
    return paymentStatus !== '';
  }, [paymentStatus]);


  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack
        spacing={2}
        direction={'row'}
      >
        <SaveInvoice
          disabled={hasPayment}
        />
        <IssueInvoice
          disabled={!invoiceId || hasPayment}
          isInvoiceIssued={isInvoiceIssued}
        />
      </Stack>

      <DeleteInvoice />
    </Stack>
  );
};
