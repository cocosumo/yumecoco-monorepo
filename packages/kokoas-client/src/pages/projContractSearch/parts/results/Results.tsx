import { Grid, Stack } from '@mui/material';
import { ResultsCount } from '../ResultsCount';
import { ResultsTable } from './ResultsTable';

export const Results = () => {



  return (
    <>
      <Grid item xs={12} >
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          alignItems={'flex-end'}
        >
          <ResultsCount resultCount={100} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ResultsTable />
      </Grid>
    </>
  );
};