import { Stack } from '@mui/material';
import { ControlledCurrencyField } from '../../fields/ControlledCurrencyField';
import { Rank } from './Rank';

export const Prospect = () => {

  return (
    <Stack spacing={2}>
      <Rank />
      <Stack
        direction="row"
      >

        <ControlledCurrencyField 
          name="schedContractPrice"
        />
      </Stack>
    </Stack>
  );
};