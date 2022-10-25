import { Stack } from '@mui/material';
import { ResultsCount } from './ResultsCount';
import { ResultsItem } from './ResultsItem';

export const Results = () => {

  return (
    <Stack>
      <ResultsCount resultCount={100} />
      <ResultsItem />
    </Stack>
  );
};