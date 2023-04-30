import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';
import { TextFieldProps } from '@mui/material';

export const ControlledCurrencyInput = ({
  name,
  label,
  variant = 'outlined',
  disabled = false,
}: {
  name: keyof TypeOfForm,
  label?: string,
  variant?: TextFieldProps['variant']
  disabled?: boolean,
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
          isTouched,
        },
      }) => {

        return (
          <NumberCommaField
            value={value as number}
            label={label}
            inputRef={ref}
            defaultValue={typeof value === 'number' ? (value as number).toLocaleString() : value}
            name={name}
            variant={variant}
            onChange={(v) => {
              onChange(v);
            }}
            onBlur={onBlur}
            error={!!error && isTouched}
            disabled={disabled}
          />
        );
      }}
    />
  );
};