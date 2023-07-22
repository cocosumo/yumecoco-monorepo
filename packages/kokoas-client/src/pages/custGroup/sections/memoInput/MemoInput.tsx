import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { TextField } from '@mui/material';

export const MemoInput = () => {
  const { control } = useTypedFormContext();
  
  return (
    <Controller
      control={control}
      name={'memo'}
      render={({
        field: {
          ref,
          ...restField
        },
        fieldState: { 
          error, 
          isDirty,
          isTouched,
        },
      }) => {

        const showError = !!error && (isDirty || isTouched);

        return (
          <TextField
            label='メモ'
            error={showError}
            inputRef={ref}
            helperText={showError ? error?.message : ''}
            multiline
            rows={4}
            sx={{
              width: 600,
            }}
            {...restField}
          />
        );
      }}
    />

  );
};