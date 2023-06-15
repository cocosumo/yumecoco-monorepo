import { FormControl, FormHelperText, InputLabel, Select as MuiSelect } from '@mui/material';
import { ComponentProps, ReactNode } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';


export const Select = <T extends FieldValues>(  {
  controllerProps,
  selectProps,
  children,
}: {
  controllerProps: UseControllerProps<T>,
  selectProps: ComponentProps<typeof MuiSelect> & {
    label?: string,
  },
  children: ReactNode,
}) => {

  const {
    label,
    onChange: customOnChange,
  } = selectProps;

  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => {
        const { error, isTouched } = fieldState;
        const isShowError = !!error && !!isTouched;
        const {
          onChange,
          ...otherFieldProps
        } = field;

        return (
          <FormControl size='small' fullWidth error={isShowError}>
            <InputLabel>
              {label}
            </InputLabel>
            <MuiSelect
              {...otherFieldProps}
              {...selectProps}
              onChange={(e, child) => {
                onChange(e);
                customOnChange?.(e, child);
              }}
              size='small'
            >
              {children}
            </MuiSelect>
            <FormHelperText>
              {isShowError ? error.message : ''}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};