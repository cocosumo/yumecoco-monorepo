import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';

export const ControlledCurrencyInput = ({
  name,
  label,
}: {
  name: keyof TypeOfForm
  label?: string,
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
            defaultValue={(value as number).toLocaleString()}
            name={name}
            onChange={(v) => {
              onChange(v);
            }}
            onBlur={onBlur}
            error={!!error && isTouched}
          />
        );
      }}
    />
  );
};