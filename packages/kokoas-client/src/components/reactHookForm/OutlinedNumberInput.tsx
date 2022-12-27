import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export const OutlinedNumberInput = forwardRef<HTMLInputElement>((props: OutlinedInputProps, ref ) => {

  return (
    <OutlinedInput
      {...props}
      inputRef={ref}
      size={'small'}
      type={'number'}
      style={{ textAlign: 'right' }}
    />
  );
});

OutlinedNumberInput.displayName = 'OutlinedNumberInput';