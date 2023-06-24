import { TextField } from '@mui/material';

export const Remarks = () => {
  return (
    <TextField
      multiline
      rows={4}
      label={'備考'}
      sx={{
        maxWidth: '600px',
      }}
    />
  );
};