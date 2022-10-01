import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import numerals from 'jp-numerals';
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
  const { value } = field;

  return (
    <TextField
      {...field}
      disabled={disabled}
      variant={'standard'}
      inputProps={{
        style: { 
          textAlign: 'right',
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            円
          </InputAdornment>),
      }}
      FormHelperTextProps={{
        sx: {
          textAlign: 'right',
        },
      }}
      helperText={numerals(+value).toString()}
    />
  );
};