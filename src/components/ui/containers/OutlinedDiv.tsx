
import { TextField } from '@mui/material';
import React from 'react';

interface OutlinedDivProps {
  children: React.ReactNode,
  label: string


}

const InputComponent =  React.forwardRef(
  function test(props, ref) {
    return <div {...ref} { ...props} />;
  },
);

export const OutlinedDiv = ({ children, label } : OutlinedDivProps) => {
  return (
    <TextField
      size='small'

      margin='none'
      fullWidth
      variant="outlined"
      label={label}
      multiline
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent,
      }}
      inputProps={{ children: children }}
    />
  );
};
