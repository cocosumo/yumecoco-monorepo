import { InputAdornment, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { fieldMapJa } from '../../api/fieldMapJa';

export const CommissionRate = () => {
  const { control } = useFormContext();


  return (
    <Controller 
      control={control}
      name={'commissionRate'}
      render={({
        field:{
          value,
          ...otherValue
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {


        return (
          <TextField 
            {...otherValue}
            value={value || ''}
            label={fieldMapJa.commissionRate} 
            sx={{
              width: '110px',
            }}
            placeholder='50'
            size='small'
            type='number'
            error={isTouched && !!error}
            helperText={error?.message}
            // end adornment is %
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  %
                </InputAdornment>),
            }}
            required
          />
        );
      }}
    />
  );
};