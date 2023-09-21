import { Typography } from '@mui/material';
import { JADatePicker } from 'kokoas-client/src/components';
import { Controller } from 'react-hook-form';
import { KForm } from '../../schema';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import parseISO from 'date-fns/parseISO';




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
      }) => {
        // MUI DateField won't accept ISO string anymore. Need more investigation. 
        // For the mean time force parsing to Date | null. -Ras
        const parseValue = (value && typeof value === 'string' ? parseISO(value as string) : value) || null;
        
        return (
          <JADatePicker
            onChange={onChange}
            value={parseValue} // keep it controlled
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
        );
      }}
    
    />

  );
};