import { LinearProgress, Stack } from '@mui/material';
import { useSearchResult } from '../hooks/useSearchResult';
import { ResultTable } from './ResultTable';
import { ResultSummary } from './ResultSummary';

export const Result = () => {

  const { data, isLoading } = useSearchResult();

  if (isLoading) return (<LinearProgress />);

  return (
    <Stack
      spacing={1}
    >
      <ResultSummary dataCount={data?.length} />
      <ResultTable data={data} />
    </Stack>
  );
  
};