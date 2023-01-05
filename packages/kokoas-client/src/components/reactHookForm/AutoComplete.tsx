import { ComponentProps } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { Autocomplete as MuiAutocomplete, TextField, TextFieldProps } from '@mui/material';

export const Autocomplete = <T extends FieldValues>( {
  controllerProps,
  autoCompleteProps,
}: {
  controllerProps: UseControllerProps<T>,
  autoCompleteProps: Omit<ComponentProps<typeof MuiAutocomplete>, 'renderInput'> & {
    options: string[]
    disabled?: boolean
    variant?: TextFieldProps['variant']
  },
},
) => {

  const {
    name,
    control,
  } = controllerProps;

  const {
    variant = 'outlined',
    freeSolo = true,
    disabled = false,
    options,
    ...otherAutoCompleteProps
  } = autoCompleteProps;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field : {
          onChange,
          value,
          ref,
        },
        fieldState,
      }) => {
        const { error, isTouched } = fieldState;
        const isShowError = !!error && !!isTouched;
        
        return (
          <MuiAutocomplete
            {...otherAutoCompleteProps}
            fullWidth
            freeSolo={freeSolo}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            value={value}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                type="search"
                size="small"
                variant={variant}
                helperText={isShowError ? error.message : ''}
              />
            )}
            disabled={disabled}
          />);
      }}
    />

  );

};