import { Button, Stack } from '@mui/material';
import { ControlledTextField } from '../../../fields/ControlledTextField';
import { AddressByPostal } from './AddressByPostal';

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

      <Button
        variant='outlined'
      >
        住所を選択
      </Button>

      <Button
        variant='outlined'
      >
        住所から検索
      </Button>
    
    </Stack>

  );
};