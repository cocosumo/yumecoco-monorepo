import { Stack } from '@mui/material';
import { ControlledCurrencyField } from '../../fields/ControlledCurrencyField';
import { Rank } from './Rank';
import { ControlledDatePicker } from '../../fields/ControlledDatePicker';
import { ControlledTextField } from '../../fields/ControlledTextField';

export const Prospect = () => {

  return (
    <Stack 
      spacing={2}
      maxWidth={600}
    >
      <Stack
        direction='row'
        spacing={2}
        justifyContent={'space-between'}
      >
        <Rank />

        <ControlledCurrencyField 
          name="schedContractPrice"
          width={400}
        />

        <ControlledTextField
          name='paymentMethod'
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