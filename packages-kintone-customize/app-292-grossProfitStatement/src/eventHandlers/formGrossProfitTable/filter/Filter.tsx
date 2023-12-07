import { Stack } from '@mui/material';
import { SelectMonths } from './SelectMonths';
import { SelectStores } from './SelectStores';
import { SelectYear } from './SelectYear';
import { SelectPeriod } from './SelectPeriod';

export const Filter = () => {
  
  return (
    <Stack
      direction='row'
      spacing={2}
      width={'70%'}
    >
  
      <SelectYear />
      <SelectPeriod />
      <SelectMonths />
      <SelectStores />

    </Stack>
  );
};