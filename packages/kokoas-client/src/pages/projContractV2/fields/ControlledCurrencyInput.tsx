import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';
import { TextFieldProps } from '@mui/material';

// TODO: ブラウザーの推薦機能による不具合を調査し、修正する

export const ControlledCurrencyInput = ({
  name,
  label,
  variant = 'outlined',
  disabled = false,
  placeholder,
}: {
  name: keyof TypeOfForm,
  label?: string,
  variant?: TextFieldProps['variant']
  disabled?: boolean,
  placeholder?: string,
}) => {


  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onBlur,
          onChange,
          ref,
          value,
        },
        fieldState: {
          error,
        },
        
      }) => {

        return (
          <NumberCommaField
            label={label}
            inputRef={ref}
            value={value as string}
            defaultValue={typeof value === 'number' ? (value as number).toLocaleString() : value}
            name={name}
            variant={variant}
            onChange={(v) => {
              const commaRemoved = typeof v === 'string' ? v.replace(/,/g, '') : v;
              const parsedValue = +commaRemoved;
              onChange(isNaN(parsedValue) ? v : parsedValue);
            }}
            onBlur={onBlur}
            error={!!error}
            disabled={disabled}
            placeholder={placeholder}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};