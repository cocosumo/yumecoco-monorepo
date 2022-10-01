import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import { getPayFieldName } from '../../form';

export const PaymentFieldAmt = (
  {
    disabled,
    idx,
  } : {
    disabled: boolean
    idx: number,
  },
) => {
  
  const [field] = useField(getPayFieldName('amount', idx));

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