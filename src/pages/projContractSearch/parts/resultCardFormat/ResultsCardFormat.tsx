import { Stack } from '@mui/material';
import { ResultsCardItem } from './ResultsCardItem';

export const ResultsCardFormat = () => {
  return (
    <Stack spacing={2}>
      <ResultsCardItem />
      <ResultsCardItem />
      <ResultsCardItem />
      <ResultsCardItem />
      <ResultsCardItem />
    </Stack>


  );
};