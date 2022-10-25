import { Stack } from '@mui/material';
import { ResultsCount } from './ResultsCount';
import { ResultsFormat } from './ResultsFormat';
import { ResultsCardFormat } from './resultCardFormat/ResultsCardFormat';

export const Results = () => {

  return (
    <Stack spacing={2} >
      <Stack justifyContent={'space-between'} direction={'row'}>
        <ResultsCount resultCount={100} />
        <ResultsFormat />
      </Stack>

      <ResultsCardFormat />
    </Stack>
  );
};