import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';

export const Memo = () => {
  const { control } = useTypedFormContext();
  return (
    <Controller
      control={control}
      name="memo"
      render={({
        field,
      }) => {
        return (
          <TextField 
            {...field}
            label={'備考'}
            multiline
            rows={4}
            size='small'
            fullWidth
            sx={{
              maxWidth: 600,
            }}
          />
        );
      }}
    />
  );
};