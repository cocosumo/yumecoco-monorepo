import { InputAdornment, TextField, Tooltip } from '@mui/material';
import { useField } from 'formik';
import { numerals } from 'jp-numerals';
import { getFieldName } from '../../form';

export const RefundAmt = (
  {
    disabled,
  } : {
    disabled: boolean
  },
) => {
  
  const [field, meta] = useField(getFieldName('refund'));
  const { value } = field;
  const { touched, error } = meta;

  const isShowError  = touched && !!error;
  const jaValue = numerals(+value || 0).toString();

  return (
    <Tooltip title={!error ? jaValue : ''}>
      <TextField
        {...field}
        value={value ?? ''}
        fullWidth
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