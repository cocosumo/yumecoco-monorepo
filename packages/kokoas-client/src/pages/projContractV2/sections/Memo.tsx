import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { TextField } from '@mui/material';

export const Memo = () => {
  const { control } = useTypedFormContext();
  
  return (
    <Controller 
      name="memo"
      control={control}
      render={({ 
        field: {
          ref,
          ...fieldsRest
        }, 
      }) => (
        <TextField 
          {...fieldsRest}
          inputRef={ref}
          fullWidth
          //label='備考'
          placeholder='備考'
          multiline
          rows={3}
          sx={{
            maxWidth: '600px',
          }}
        />
      )}
    />
  );
};