import { Stack } from '@mui/material';
import { ControlledDatePicker } from '../../fields/ControlledDatePicker';

export const ProjectDates = () => {
  return (
    <Stack 
      spacing={2}
      direction='row'
      maxWidth={600}
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