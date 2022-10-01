import { InputAdornment, TextField, Tooltip } from '@mui/material';
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
  
  const [field, meta] = useField(getPayFieldName('amount', idx));
  const { value } = field;
  const { touched, error } = meta;

  const isShowError  = touched && !!error;

  return (
    <Tooltip title={numerals(+value).toString()}>
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
        helperText={isShowError ? error : ''}
      />
    </Tooltip>
  );
};