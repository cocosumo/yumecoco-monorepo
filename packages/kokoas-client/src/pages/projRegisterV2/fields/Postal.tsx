import { Button, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
        startIcon={<SearchIcon />} 
        variant='outlined'
      >
        郵便番号から住所を検索
      </Button>
 
 
      <Button>
        住所から郵便番号を検索
      </Button>

    
    </Stack>

  );
};