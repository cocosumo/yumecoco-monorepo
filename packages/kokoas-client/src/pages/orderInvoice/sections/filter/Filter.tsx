import { Stack } from '@mui/material';
import { ProjName } from './ProjName';
import { InvoiceDate } from './invoiceDate/InvoiceDate';
import { SearchButton } from './SearchButton';

export const Filter = () => {  

  return (
    <Stack 
      direction={'row'}
      spacing={3}
      
    >
      <ProjName />
      <InvoiceDate />
      <SearchButton />
    </Stack>
  );
};      