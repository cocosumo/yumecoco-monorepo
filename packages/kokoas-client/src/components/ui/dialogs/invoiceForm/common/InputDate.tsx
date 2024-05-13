import { JADatePicker } from 'kokoas-client/src/components';
import { useInvoiceFormContext } from '../hooks/useInvoiceRHF';
import { Controller, FieldPath } from 'react-hook-form';
import { TInvoiceForm } from '../schema';

export interface InputDateProps {
  label: string;
  required?: boolean;
  name: FieldPath<TInvoiceForm>;
}

export const InputDate = ({
  label,
  name,
  required = true,
} : InputDateProps) => {

  const { control } = useInvoiceFormContext();

  return (
    <Controller 
      control={control}
      name={name}
      render={({ 
        field, 
        fieldState: {
          error,
        },
      }) => (
        <JADatePicker
          label={label}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
              required,
            },
          }}
          {...field}
        />
      )}
    />
  );

};