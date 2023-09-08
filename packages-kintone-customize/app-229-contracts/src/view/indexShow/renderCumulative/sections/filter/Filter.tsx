import { Stack } from '@mui/material';
import { SelectMonths } from './SelectMonths';

export const Filter = () => {
  
  return (
    <Stack
      direction='row'
      spacing={2}
      p={2}
    >
      
      <SelectMonths />

    </Stack>
  );
};