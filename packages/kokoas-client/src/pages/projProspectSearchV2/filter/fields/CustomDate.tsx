import { Typography } from '@mui/material';
import { JADatePicker } from 'kokoas-client/src/components';
import { Controller } from 'react-hook-form';
import { KForm } from '../../schema';
import { useTypedFormContext } from '../../hooks/useTypedHooks';




export const CustomDate = ({
  iconLabel,
  name,
}: {
  iconLabel: 'から' | 'まで'
  name: KForm
}) => {
  const { control } = useTypedFormContext();

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
          onChange={onChange}
          value={value ?? null} // keep it controlled
          slots={{
            openPickerIcon: () =>   (
              <Typography variant='caption'>
                {iconLabel}
              </Typography>),
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
              fullWidth: true,
            },
          }}
        />
      )}
    
    />

  );
};