
import { TextField } from '@mui/material';
import { TextMaskPostal } from './Masks';
import { useState, ChangeEvent } from 'react';

/**
 * Sample of mask
 * @deprecated
 *
 * */
export function FormikMaskTextField() {
  const [value, setValue] = useState<string>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (

    <TextField
      label="postal"
      value={value}
      variant="outlined"
      onChange={handleChange}
      InputProps={{
        inputComponent: TextMaskPostal as any,
      }}
    />

  );
}
