import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import { forwardRef } from 'react';

export const OutlinedNumberInput = forwardRef<OutlinedInputProps, OutlinedInputProps>((props, ref ) => {

  const {
    inputProps = {
      style: { textAlign: 'right' },
    },
  } = props;

  return (
    <OutlinedInput
      {...props}
      inputRef={ref}
      size={'small'}
      type={'number'}
      inputProps={inputProps}
    />
  );
});

OutlinedNumberInput.displayName = 'OutlinedNumberInput';