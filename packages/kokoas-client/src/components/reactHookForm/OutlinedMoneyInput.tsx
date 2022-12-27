import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export const OutlinedMoneyInput = forwardRef<HTMLInputElement, OutlinedInputProps>((props: OutlinedInputProps, ref ) => {
  return (
    <OutlinedInput
      {...props}
      inputRef={ref}
      size={'small'}
      type={'number'}
      inputProps={{
        style: { textAlign: 'right' },
      }}
      endAdornment={(
        <InputAdornment position='end'>
          円
        </InputAdornment>
      )}
    />
  );
});

OutlinedMoneyInput.displayName = 'OutlinedMoneyInput';