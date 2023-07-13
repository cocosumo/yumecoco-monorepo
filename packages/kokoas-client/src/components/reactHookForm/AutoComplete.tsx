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
    variant?: TextFieldProps['variant'],
    showHelperText?: boolean,
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
    showHelperText = false,
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
          ...otherField
        },
        fieldState,
      }) => {
        const { error, isTouched } = fieldState;
        const isShowError = !!error && !!isTouched ;
        return (
          <MuiAutocomplete
            {...otherAutoCompleteProps}
            fullWidth
            freeSolo={freeSolo}
            autoSelect
            onInputChange={(_, newValue) => {
              onChange(newValue as any);
            }}
            value={value}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                {...otherField}
                inputRef={ref}
                type="search"
                size="small"
                name={name}
                variant={variant}
                error={isShowError}
                helperText={showHelperText && isShowError ? error.message : undefined}
              />
            )}
            disabled={disabled}
          />);
      }}
    />

  );

};