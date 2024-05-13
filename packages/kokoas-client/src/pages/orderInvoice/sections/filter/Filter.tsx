import { Stack } from '@mui/material';
import { ProjName } from './ProjName';
import { InvoiceDate } from './invoiceDate/InvoiceDate';
import { SearchButton } from './SearchButton';
import { ResetButton } from './ResetButton';

export const Filter = () => {  

  return (
    <Stack 
      direction={'row'}
      spacing={3}
      
    >
      <ProjName />
      <InvoiceDate />
      <SearchButton />
      <ResetButton />
    </Stack>
  );
};      