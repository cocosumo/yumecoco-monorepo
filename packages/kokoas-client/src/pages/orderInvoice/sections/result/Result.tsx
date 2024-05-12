import { LinearProgress } from '@mui/material';
import { useSearchResult } from '../../hooks/useSearchResult';
import { ResultTable } from './ResultTable';

export const Result = () => {

  const { data, isLoading } = useSearchResult();
  

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <ResultTable data={data} />
  );
};