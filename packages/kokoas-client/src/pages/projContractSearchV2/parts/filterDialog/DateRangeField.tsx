import { JADatePicker } from 'kokoas-client/src/components';
import { Controller } from 'react-hook-form';
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
        field: { 
          onBlur, 
          onChange,
          value,
          ...field 
        },
        fieldState: {
          isTouched,
          error,
        },
      }) => {
        const isShowError = !!error?.message && !!isTouched;

        return (
          <JADatePicker
            {...field}
            value={value} // keep it controlled
            onChange={onChange}
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