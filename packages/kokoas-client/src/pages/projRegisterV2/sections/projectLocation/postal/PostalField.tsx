import { TextField } from '@mui/material';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';

export const PostalField = () => {
  const {
    control,
  } = useTypedFormContext();

  return (
    <Controller 
      control={control}
      name='postal'
      render={({
        field,
        fieldState: {
          error,
          isTouched,
        },
      }) => {


        return (
          <TextField 
            {...field}
            label="郵便番号" 
            placeholder='4418124'
            sx={{
              width: '200px',
            }}
            size='small'
            error={isTouched && !!error}
            helperText={isTouched && error?.message}
          />
        );
      }}
    />

  );
};