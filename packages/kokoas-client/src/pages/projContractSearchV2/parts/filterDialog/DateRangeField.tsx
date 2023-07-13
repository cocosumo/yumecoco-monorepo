import { JADatePicker } from 'kokoas-client/src/components';
import { Controller } from 'react-hook-form';
import parseISO from 'date-fns/parseISO';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { KForm } from '../../schema';

export const DateRangeField = ({
  name,
} : {
  name: KForm
}) => {
  const { control } = useTypedFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onBlur, ...field },
        fieldState: {
          isTouched,
          error,
        },
      }) => {

        const isShowError = !!error?.message && !!isTouched;
        return (
          <JADatePicker
            {...field}
            value={field.value ? parseISO(field.value as string) : null} // keep it controlled
            slotProps={{
              textField: {
                onBlur,
                variant: 'outlined',
                size: 'small',
                error: isShowError,
              },
            }}
          />
        );
      }}
    />
  );
};