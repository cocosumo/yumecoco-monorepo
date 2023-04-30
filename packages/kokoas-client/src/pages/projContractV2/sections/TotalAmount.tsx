import { Stack } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const TotalAmount = () => {

  return (
    <Stack maxWidth={450} width={'100%'} spacing={2}
      my={2}
    >
      <ControlledCurrencyInput name="totalContractAmt" label="契約合計金額" />
      <ControlledCurrencyInput name="projectCost" label="売上原価" />
    </Stack>
  );
};
