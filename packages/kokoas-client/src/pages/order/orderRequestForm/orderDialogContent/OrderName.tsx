import { TextField } from '@mui/material';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';

export const OrderName = () => {
  const { control } = useOrderFormContext();

  return (
    <Controller 
      name={'orderName'}
      control={control}
      render={({ 
        field: {
          ref,
          ...otherFieldProps
        }, 
        fieldState: { error },
      }) => (
        <TextField 
          {...otherFieldProps}
          inputRef={ref}
          label={'発注名'}
          fullWidth
          variant={'outlined'}
          size={'small'}
          required
          InputProps={{
            style: { maxWidth: '400px' },
          }}
          error={!!error}
          helperText={error?.message}
        />
      )}

    />

  );
};