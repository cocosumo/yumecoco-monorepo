import { InputAdornment } from '@mui/material';
import { NumberField } from './NumberField';
import { TextField } from './TextField';

export const PercentField: typeof TextField = ({
  controllerProps,
  textFieldProps,
}) => {

  const {
    InputProps,
    ...otherTextFieldProps
  } = textFieldProps;

  return (
    <NumberField 
      controllerProps={controllerProps}
      textFieldProps={{
        ...otherTextFieldProps,
        type: 'number',
        InputProps: {
          ...InputProps,
          endAdornment:(
            <InputAdornment position="end">
              %
            </InputAdornment>),
        },
      }} 
    />
  );
};