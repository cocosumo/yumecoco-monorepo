import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export const OutlinedPercentInput = forwardRef<OutlinedInputProps, OutlinedInputProps>((props, ref ) => {
  return (
    <OutlinedInput
      {...props}
      inputRef={ref}
      size={'small'}
      type={'number'}
      endAdornment={(
        <InputAdornment position='end' disablePointerEvents>
          %
        </InputAdornment>
      )}
    />
  );
});

OutlinedPercentInput.displayName = 'OutlinedPercentInput';