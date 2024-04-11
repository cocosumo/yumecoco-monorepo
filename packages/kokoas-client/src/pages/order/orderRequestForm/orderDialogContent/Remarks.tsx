import { TextField } from '@mui/material';
import { useOrderFormContext } from '../hooks/useOrderRHF';
import { Controller } from 'react-hook-form';

export const Remarks = () => {
  const { control } = useOrderFormContext();

  return (
    <Controller
      name={'remarks'}
      control={control}
      render={({ 
        field: {
          value,
          onChange,
          ref,
        },
        fieldState: {
          error,
        },
      }) => {
        return (
          <TextField
            label={'特記事項'}
            value={value}
            onChange={onChange}
            fullWidth
            variant={'outlined'}
            size={'small'}
            multiline
            rows={4}
            InputProps={{
              style: { maxWidth: '400px' },
            }}
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}

    />
  );
};