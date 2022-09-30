import { InputAdornment, TextField } from '@mui/material';

export const PaymentFieldAmt = (
  {

    disabled,
  } : {
    disabled: boolean
    name: string,
  },
) => {
  return (
    <TextField
      disabled={disabled}
      variant={'standard'}
      inputProps={{
        style: { textAlign: 'right' },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            円
          </InputAdornment>),
      }}
    />
  );
};