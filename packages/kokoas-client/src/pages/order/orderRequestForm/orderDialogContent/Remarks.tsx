import { TextField } from '@mui/material';

export const Remarks = () => {
  return (
    <TextField 
      label={'備考'}
      fullWidth
      variant={'outlined'}
      size={'small'}
      multiline
      rows={4}
      InputProps={{
        style: { maxWidth: '400px' },
      }}
    />
  );
};