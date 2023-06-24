import { Button, Stack } from '@mui/material';
import { PostalField } from './PostalField';

export const Postal = () => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >

      <PostalField />

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