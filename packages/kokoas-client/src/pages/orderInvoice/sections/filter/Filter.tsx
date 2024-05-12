import { Stack } from '@mui/material';
import { ProjName } from './ProjName';
import { InvoiceDate } from './invoiceDate/InvoiceDate';

export const Filter = () => {  

  return (
    <Stack 
      direction={'row'}
      spacing={3}
      
    >
      <ProjName />
      <InvoiceDate />
    </Stack>
  );
};      