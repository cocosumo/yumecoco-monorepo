import { Button, Stack } from '@mui/material';
import { ControlledTextField } from '../../../fields/ControlledTextField';

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

      <Button
        variant='outlined'
      >
        郵便番号から検索
      </Button>

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