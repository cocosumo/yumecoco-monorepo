import { Stack } from '@mui/material';
import { SelectMonths } from './SelectMonths';
import { SelectStores } from './SelectStores';
import { SelectYear } from './SelectYear';

export const Filter = () => {
  
  return (
    <Stack
      direction='row'
      spacing={2}
      py={2}
    >
  
      <SelectYear />
      <SelectMonths />
      <SelectStores />

    </Stack>
  );
};