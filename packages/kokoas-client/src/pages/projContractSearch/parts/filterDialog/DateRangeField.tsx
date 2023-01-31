import { TextField } from '@mui/material';
import { JADatePicker } from 'kokoas-client/src/components';
import { Controller, useFormContext } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';

export const DateRangeField = ({
  name,
} : {
  name: KeyOfForm
}) => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: {
          isTouched,
          error,
        },
      }) => {
        const isShowError = !!error?.message && !!isTouched;
        return (
          <JADatePicker
            {...field}
            value={field.value ?? null} // keep it controlled
            renderInput={(params) =>(
              <TextField
                {...params}
                variant={'outlined'}
                size={'small'}
                error={isShowError}
                helperText={isShowError ? error.message : ''}
              />)}
          />
        );
      }}
    />
  );
};