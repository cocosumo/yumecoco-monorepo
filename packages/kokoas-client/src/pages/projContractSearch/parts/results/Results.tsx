import { Grid, Stack } from '@mui/material';
import { useFilteredContracts } from '../../hooks/useFilteredContracts';
import { ResultsCount } from '../ResultsCount';
import { ResultsTable } from './ResultsTable';
import { ResultsTBody } from './ResultsTBody';

export const Results = () => {

  const { data } = useFilteredContracts();


  return (
    <>
      <Grid item xs={12} >
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          alignItems={'flex-end'}
        >
          <ResultsCount resultCount={data?.length ?? 0} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ResultsTable >
          <ResultsTBody data={data ?? []} />
        </ResultsTable>
      </Grid>
    </>
  );
};