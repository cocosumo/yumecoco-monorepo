import { Stack } from '@mui/material';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';
import { MaskedPostal } from './MaskedPostal';

export const Postal = () => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >
      <MaskedPostal /> 

      <AddressByPostal />

      <PostalByAddress />

      <SelectAddress />

    
    </Stack>

  );
};