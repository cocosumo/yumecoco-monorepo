import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';

export const PaymentFieldAmt = (
  {
    name,
    disabled,
  } : {
    disabled: boolean
    name: string,
  },
) => {

  const [field] = useField(`${name}_amt`);



  return (
    <TextField
      {...field}
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