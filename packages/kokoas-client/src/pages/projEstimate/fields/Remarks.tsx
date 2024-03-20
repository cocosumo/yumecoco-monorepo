import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TForm } from '../schema';

export const Remarks = () => {
  const { control } = useFormContext<TForm>();

  
  return (
    <Controller
      name='remarks'
      control={control}
      render={({ field }) => (
        <TextField
          label={'備考'}
          multiline
          rows={4}
          fullWidth
          placeholder='備考を入力してください。'
          size='small'
          sx={{
            maxWidth: 400,
          }}
          {...field}
        />
      )}
    />
  );
};