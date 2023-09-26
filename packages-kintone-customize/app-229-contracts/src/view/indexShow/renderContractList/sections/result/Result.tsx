import { Paper, Stack } from '@mui/material';
import { Contracts } from './contracts/Contracts';
import { Summary } from './Summary/Summary';

export const Result = () => {
  
  return (
    <Stack
      spacing={2}
      p={1}
      sx={{ 
        overflow: 'auto',
        height: 'calc(80vh - 72px)',
      }}
      component={Paper}
    >
      <Contracts />
      <Summary />
    </Stack>
  );
};