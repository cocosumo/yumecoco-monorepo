import { LinearProgress, Stack } from '@mui/material';
import { useSearchResult } from '../hooks/useSearchResult';
import { ResultTable } from './ResultTable';
import { ResultSummary } from './ResultSummary';
import { DownloadResult } from './DownloadResult';

export const Result = () => {

  const { data = [], isLoading } = useSearchResult();

  if (isLoading) return (<LinearProgress />);

  return (
    <Stack
      spacing={1}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <ResultSummary dataCount={data?.length} />
        <DownloadResult data={data} />
      </Stack>
      <ResultTable data={data} />
    </Stack>
  );
  
};