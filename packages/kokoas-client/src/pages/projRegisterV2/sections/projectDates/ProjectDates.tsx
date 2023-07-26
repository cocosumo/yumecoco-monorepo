import { Stack } from '@mui/material';
import { ControlledDatePicker } from '../../fields/ControlledDatePicker';

export const ProjectDates = () => {
  return (
    <Stack 
      spacing={2}
      width={300}
    >
      
      <ControlledDatePicker 
        name='deliveryDate'
      />

      <ControlledDatePicker 
        name='payFinDate'
      />

      <ControlledDatePicker 
        name='projFinDate'
      />

    </Stack>
  );
};