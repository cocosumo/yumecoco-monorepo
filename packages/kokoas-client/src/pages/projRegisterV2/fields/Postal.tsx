import { Button, Stack, TextField } from '@mui/material';

export const Postal = () => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >

      <TextField 
        label="郵便番号" 
        placeholder='4418124'
        sx={{
          width: '200px',
        }}
        size='small'
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