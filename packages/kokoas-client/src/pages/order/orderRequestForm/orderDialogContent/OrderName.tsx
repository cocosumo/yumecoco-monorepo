import { TextField } from '@mui/material';

export const OrderName = () => {


  return (
    <TextField 
      label={'発注名'}
      fullWidth
      variant={'outlined'}
      size={'small'}
      required
      InputProps={{
        style: { maxWidth: '400px' },
      }}
    />
  );
};