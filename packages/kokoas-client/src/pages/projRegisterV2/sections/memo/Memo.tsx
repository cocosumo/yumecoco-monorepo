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
        field: {
          ref,
          ...field
        },
        fieldState: {
          error,
          isTouched,
        },
        
      }) => {
        const isShowError = isTouched && !!error;
        return (
          <TextField 
            {...field}
            inputRef={ref}
            label={'備考'}
            multiline
            rows={4}
            size='small'
            fullWidth
            sx={{
              maxWidth: 600,
            }}
            error={isShowError}
            helperText={isShowError ? error.message : ''}
          />
        );
      }}
    />
  );
};