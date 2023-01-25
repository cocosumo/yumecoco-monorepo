import { TextField } from './TextField';

export const NumberField: typeof TextField  = ({
  controllerProps,
  textFieldProps,
}) => {

  const {
    InputProps,
    ...otherTextFieldProps
  } = textFieldProps;

  return (
    <TextField 
      controllerProps={controllerProps}
      textFieldProps={{
        ...otherTextFieldProps,
        type: 'number',
        InputProps: {
          ...InputProps,
          inputProps: { style: { textAlign: 'right' } },
        },
      }} 
    />
  );
};