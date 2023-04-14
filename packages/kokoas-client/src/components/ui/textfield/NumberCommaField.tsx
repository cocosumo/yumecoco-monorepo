import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { UseNumberCommaFieldProps, useNumberCommaField } from 'kokoas-client/src/hooks/useNumberCommaField';
import { forwardRef } from 'react';

type NumberCommaFieldProps = Omit<TextFieldProps, 'onChange' | 'onBlur' | 'value'> & UseNumberCommaFieldProps;


/**
 * TextFieldから派生したコンポーネントですが、
 * コンマ区切りの数字を入力することが出来ます。
 * 
 * 必要に応じて改修
 */
export const NumberCommaField = forwardRef<HTMLInputElement, NumberCommaFieldProps>((props, ref) => {
  
  const { 
    value,
    onChange,
    onBlur,
    ...others
  } = props;
  
  const textProps = useNumberCommaField({
    onChange,
    onBlur,
    value,
  });

  return (
    <TextField 
      ref={ref}
      inputProps={{ 
        style: { textAlign: 'right' }, 
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' disablePointerEvents>
            円
          </InputAdornment>
        ),
      }}
      {...others} 
      {...textProps}
    />
  );
});

NumberCommaField.displayName = 'NumberCommaField';