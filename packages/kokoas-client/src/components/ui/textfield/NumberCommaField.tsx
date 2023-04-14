import { TextField, TextFieldProps } from '@mui/material';
import { UseNumberCommaFieldProps, useNumberCommaField } from 'kokoas-client/src/hooks/useNumberCommaField';
import { forwardRef } from 'react';

type NumberCommaFieldProps = Omit<TextFieldProps, 'onChange' | 'onBlur' | 'value'> & UseNumberCommaFieldProps;

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
      {...others} 
      {...textProps}
    />
  );
});

NumberCommaField.displayName = 'NumberCommaField';