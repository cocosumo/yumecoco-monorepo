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
            onChange={({ target: { value: newValue } }) =>  field.onChange((newValue ? Number(newValue) : newValue) as number)}
            sx={{
              width: 100,
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