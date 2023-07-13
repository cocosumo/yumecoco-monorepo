import { Stack } from '@mui/material';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { ResultsCount } from '../ResultsCount';
import { ResultsTable } from './ResultsTable';
import { ResultsTBody } from './ResultsTBody';
import { ResultTotalAmount } from './ResultTotalAmount';

export const Results = ({
  items = [],
}: {
  items?: ContractRow[]
}) => {

  return (
    <Stack spacing={1}>
      <Stack
        direction={'row'}
        alignItems={'flex-end'}
        spacing={4}
      >
        <ResultsCount resultCount={items?.length ?? 0} />
        <ResultTotalAmount items={items} />
      </Stack>
      <ResultsTable >
        <ResultsTBody items={items} />
      </ResultsTable>
    </Stack>
  );
};