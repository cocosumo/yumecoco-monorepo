import { TextField } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { useStartSearch } from '../../hooks/useStartSearch';

export const ProjName = () => {
  const { control } = useTypedFormContext();
  const handleStartSearch  = useStartSearch();

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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleStartSearch();
              }
            }}
          />
        );
      }}
    />
  );

};