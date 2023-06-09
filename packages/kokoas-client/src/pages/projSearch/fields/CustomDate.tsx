import { TextField, Typography } from '@mui/material';
import { JADatePicker } from 'kokoas-client/src/components';
import { KeyOfForm, TypeOfForm } from '../schema';
import { Controller, useFormContext } from 'react-hook-form';




export const CustomDate = ({
  iconLabel,
  name,
}: {
  iconLabel: 'から' | 'まで'
  name: KeyOfForm
}) => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field: {
          value,
          onChange,
        },
      }) => (
        <JADatePicker
          components={{
            OpenPickerIcon: () =>   (
              <Typography variant='caption'>
                {iconLabel}
              </Typography>),
          }}
          onChange={onChange}
          value={value ?? null} // keep it controlled
          renderInput={(params) =>(
            <TextField
              {...params}
              fullWidth
              variant={'outlined'}
              size={'small'}
            />)}
        />
      )}
    
    />

  );
};