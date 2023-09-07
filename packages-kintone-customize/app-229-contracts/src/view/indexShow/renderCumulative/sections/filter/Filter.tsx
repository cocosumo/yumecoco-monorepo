import { Stack } from '@mui/material';
import { SelectYear } from './SelectYear';

export const Filter = () => {
  
  return (
    <Stack
      direction='row'
      spacing={2}
      p={2}
    >
      
      <SelectYear />

    </Stack>
  );
};