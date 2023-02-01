import { Grid, Stack } from '@mui/material';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { ResultsCount } from '../ResultsCount';
import { ResultsTable } from './ResultsTable';
import { ResultsTBody } from './ResultsTBody';

export const Results = ({
  items = [],
}: {
  items?: ContractRow[]
}) => {

  return (
    <>
      <Grid item xs={12} >
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          alignItems={'flex-end'}
        >
          <ResultsCount resultCount={items?.length ?? 0} />
          {/* ここに何か配置する */}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ResultsTable >
          <ResultsTBody items={items} />
        </ResultsTable>
      </Grid>
    </>
  );
};