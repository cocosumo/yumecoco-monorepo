import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export const OutlinedMoneyInput = forwardRef<HTMLInputElement>((props: OutlinedInputProps, ref ) => {
  return (
    <OutlinedInput
      {...props}
      inputRef={ref}
      size={'small'}
      type={'number'}
      style={{ textAlign: 'right' }}
      endAdornment={(
        <InputAdornment position='end'>
          円
        </InputAdornment>
      )}
    />
  );
});

OutlinedMoneyInput.displayName = 'OutlinedMoneyInput';