import { TextField } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';

export const ProjName = () => {
  const { control } = useTypedFormContext();

  return (
    <Controller
      name="projName"
      control={control}
      render={({ 
        field,
        fieldState: { error },
      }) => {
        return (
          <TextField 
            {...field}
            size="small" 
            label="工事名"
            placeholder='山田太郎　新築工事'
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );

};