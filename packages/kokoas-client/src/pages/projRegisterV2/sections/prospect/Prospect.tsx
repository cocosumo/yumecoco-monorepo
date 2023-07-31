import { Stack } from '@mui/material';
import { ControlledCurrencyField } from '../../fields/ControlledCurrencyField';
import { Rank } from './Rank';
import { ControlledDatePicker } from '../../fields/ControlledDatePicker';

export const Prospect = () => {

  return (
    <Stack 
      spacing={2}
      maxWidth={600}
    >
      <Stack
        direction='row'
        spacing={2}
      >
        <Rank />

        <ControlledCurrencyField 
          name="schedContractPrice"
          fullWidth
        />

      </Stack>

      <Stack 
        spacing={2}
        direction='row'
      >
        <ControlledDatePicker
          name='estatePurchaseDate'
        />
        <ControlledDatePicker
          name='planApplicationDate'
        />
        <ControlledDatePicker
          name='schedContractDate'
        />
      </Stack>
    </Stack>
  );
};