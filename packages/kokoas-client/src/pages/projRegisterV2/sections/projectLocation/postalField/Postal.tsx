import { Stack } from '@mui/material';
import { ControlledTextField } from '../../../fields/ControlledTextField';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';

export const Postal = () => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >

      <ControlledTextField
        name='postal'
        label='郵便番号'
        placeholder='4418124'
      />

      <AddressByPostal />

      <PostalByAddress />

      <SelectAddress />

    
    </Stack>

  );
};