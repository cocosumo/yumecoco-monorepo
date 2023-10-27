import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { InputAdornment, TextField } from '@mui/material';

export const ProjPeriod = () => {
  const { control } = useTypedFormContext();
  return (
    <Controller 
      name="projPeriod"
      control={control}
      render={({
        field,
      }) => {


        return (
          <TextField 
            {...field}
            label="業務の期間"
            size="small"
            type="number"
            sx={{
              width: 150,
            }}
            inputProps={{
              style: {
                textAlign: 'right',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  日間
                </InputAdornment>),
            }}
          />);

      }}
    />
  );
};