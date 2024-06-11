import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { TextField } from '@mui/material';



export const Remarks = () => {

  const { control } = useTypedFormContext();
  
  return (
    <Controller
      control={control}
      name={'remarks'}
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
            label='備考'
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
