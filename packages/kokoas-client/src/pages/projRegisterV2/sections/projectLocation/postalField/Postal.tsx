import { Stack } from '@mui/material';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';
import { MaskedPostal } from './MaskedPostal';

export const Postal = ({
  disabled = false,
}:{
  disabled?: boolean;
}) => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >
      <MaskedPostal disabled={disabled} /> 

      {!disabled && (
        <>
          <AddressByPostal />
          <PostalByAddress />
          <SelectAddress />
        </>
      )}


    
    </Stack>

  );
};