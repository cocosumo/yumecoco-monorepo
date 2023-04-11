import { InputAdornment, TextField, Tooltip } from '@mui/material';
import { useField } from 'formik';
import { numerals } from 'jp-numerals';
import { getFieldName } from '../../form';


const fieldName = getFieldName('subsidyAmt');

export const SubsidyAmt = (
  {
    disabled,
  } : {
    disabled: boolean
  },
) => {
  
  const [field, meta] = useField(fieldName);
  const { value } = field;
  const { error, touched } = meta;

  const jaValue = numerals(+value || 0).toString();

  return (
    <Tooltip title={!error ? jaValue : ''}>
      <div>
        <TextField
          {...field}
          value={value || ''}
          disabled={disabled}
          variant={'standard'}
          fullWidth
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

      </div>
    </Tooltip>
  );
};