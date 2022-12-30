import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export const OutlinedNumberInput = forwardRef<OutlinedInputProps, OutlinedInputProps>((props, ref ) => {

  return (
    <OutlinedInput
      {...props}
      inputRef={ref}
      size={'small'}
      type={'number'}
      inputProps={{
        style: { textAlign: 'right' },
      }}
    />
  );
});

OutlinedNumberInput.displayName = 'OutlinedNumberInput';