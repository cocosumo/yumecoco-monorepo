import { Stack } from '@mui/material';
import { InvoiceDateFrom } from './InvoiceDateFrom';
import { InvoiceDateTo } from './InvoiceDateTo';

export const InvoiceDate = () => {

  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      <InvoiceDateFrom />
      <InvoiceDateTo />
    </Stack>
  );
 
};