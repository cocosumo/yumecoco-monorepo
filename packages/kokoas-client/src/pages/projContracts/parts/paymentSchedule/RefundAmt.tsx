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
  
  const [field, meta] = useField(getFieldName('refundAmt'));
  const { value } = field;
  const { error, touched } = meta;

  const jaValue = numerals(+value || 0).toString();

  return (
    <Tooltip title={!error ? jaValue : ''}>
      <TextField
        {...field}
        value={value || ''}
        disabled={disabled}
        variant={'standard'}
        sx={{
          width: '78%',
        }}
        inputProps={{
          sx: { 
            textAlign: 'right',
          },
        }}
        error={touched && !!error}
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
        helperText={!disabled ? error : ''}
      />
    </Tooltip>
  );
};