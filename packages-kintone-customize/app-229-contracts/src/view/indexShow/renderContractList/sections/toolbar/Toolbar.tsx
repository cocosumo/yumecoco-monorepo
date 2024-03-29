import { Paper } from '@mui/material';
import { Stack } from '@mui/system';
import { PrintButton } from './PrintButton';
import { YearSelect } from './YearSelect';
import { MonthSelect } from './MonthSelect';

export const Toolbar = () => {

  return (
    <Stack
      direction='row'
      justifyContent={'space-between'}
      p={2}
      mb={2}
      component={Paper}
      sx={{
        position: 'sticky',
        top: 80,
        left: 40,
        width: 'calc(100vw - 150px)',
        // reduce opacity
        bgcolor: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <Stack
        spacing={1}
        direction='row'
      >
        <YearSelect />

        <MonthSelect />
        
      </Stack>

      <PrintButton />
  
    </Stack>
  );
};