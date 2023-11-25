import { Stack } from '@mui/material';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';
import { MaskedPostal } from './MaskedPostal';

export const Postal = ({
  disabled = false,
  showButtons = true,
}:{
  disabled?: boolean,
  showButtons?: boolean,
}) => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >
      <MaskedPostal 
        name='postal'
        disabled={disabled}
      /> 

      {!disabled && showButtons && (
        <>
          <AddressByPostal />
          <PostalByAddress />
          <SelectAddress />
        </>
      )}


    
    </Stack>

  );
};