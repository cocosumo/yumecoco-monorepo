import { TextField } from '@mui/material';

export const PostalField = () => {
  

  return (
    <TextField 
      label="郵便番号" 
      placeholder='4418124'
      sx={{
        width: '200px',
      }}
      size='small'
    />
  );
};