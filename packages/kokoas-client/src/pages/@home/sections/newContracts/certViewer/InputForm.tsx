import { Stack } from '@mui/material';
import { FinancingMethod } from './fields/FinancingMethod';

export const InputForm = () => {
  return (
    <Stack spacing={2}>
      <FinancingMethod />
    </Stack>
  );
};