import { Stack } from '@mui/material';
import { ResultsCount } from './ResultsCount';
import { ResultsItem } from './ResultsItem';

export const Results = () => {

  return (
    <Stack spacing={2}>
      <ResultsCount resultCount={100} />
      <ResultsItem />
      <ResultsItem />
      <ResultsItem />
      <ResultsItem />
    </Stack>
  );
};