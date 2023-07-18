import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { TextField } from '@mui/material';

export const CustName = () => {
  const { control } = useTypedFormContext();

  
  return (
    <Controller 
      control={control}
      name={'custName'}
      render={({
        field: {
          ref,
          ...otherFields
        },
        fieldState: {
          isTouched,
          isDirty,
          error,
        },
      }) => {
        const showError = isTouched && isDirty && error;

        return (
          <TextField
            {...otherFields}
            inputRef={ref}
            fullWidth
            label={'顧客名'}
            variant={'outlined'}
            placeholder='山田太郎'
            size='small'
            error={!!showError}
            helperText={showError ? error?.message : null}
          />
        );
      }}
    />
  );
};