import { Stack } from '@mui/material';
import { InvoiceList } from './invoiceList/InvoiceList';
import { InvoiceSummary } from './invoiceSummary/InvoiceSummary';

export const InvoiceNavigation = () => {

  
  return (
    <Stack 
      height={'100%'} 
      minWidth={'180px'}
      borderRight={'1px solid #e0e0e0'}
    >
      <InvoiceList />
      <InvoiceSummary />
    </Stack>
  );
};