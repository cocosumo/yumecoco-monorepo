import { Stack } from '@mui/material';
import { SelectMonths } from './SelectMonths';
import { SelectStores } from './SelectStores';

export const Filter = () => {
  
  return (
    <Stack
      direction='row'
      spacing={2}
      p={2}
    >
      <SelectStores />
      <SelectMonths />

    </Stack>
  );
};