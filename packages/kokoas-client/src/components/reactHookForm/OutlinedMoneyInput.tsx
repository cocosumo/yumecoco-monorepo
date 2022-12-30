import { InputAdornment, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';
import { OutlinedNumberInput } from './OutlinedNumberInput';

export const OutlinedMoneyInput = forwardRef<OutlinedInputProps, OutlinedInputProps>((props, ref ) => {
  return (
    <OutlinedNumberInput 
      {...props}
      ref={ref}
      endAdornment={(
        <InputAdornment position='end'>
          円
        </InputAdornment>
      )}
    />
  );
});

OutlinedMoneyInput.displayName = 'OutlinedMoneyInput';