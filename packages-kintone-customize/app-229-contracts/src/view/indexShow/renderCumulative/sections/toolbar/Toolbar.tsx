import { Paper, Stack } from '@mui/material';
import { Filter } from '../filter/Filter';
import { PrintButton } from './PrintButton';

export const Toolbar = () => {


  return (
    <Stack
      direction='row'
      justifyContent={'space-between'}
      p={2}
      mb={2}
      component={Paper}
    >
      <Filter />
      <Stack 
        spacing={2}
      >
        <PrintButton />
        

      </Stack>
    </Stack>
  );
};