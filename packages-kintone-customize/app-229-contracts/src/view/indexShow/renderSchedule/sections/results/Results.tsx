import { Stack } from '@mui/material';
import { Title } from './Title';
import { ResultTable } from './resultTable/ResultTable';

export const Results = () => {
  
  return (
    <Stack
      spacing={2}
    >
      <Title />
      <ResultTable />
    </Stack>
  );
};