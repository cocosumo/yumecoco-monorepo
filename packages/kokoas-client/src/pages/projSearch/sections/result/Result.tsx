import { LinearProgress } from '@mui/material';
import { useSearchResult } from '../../hooks/useSearchResult';
import { ResultCount } from './ResultCount';
import { ResultTable } from './ResultTable';

export const Result = () => {

  const { data, isLoading } = useSearchResult();
  return (
    <>
      <ResultCount count={data?.length ?? 0} />
      {!isLoading &&  <ResultTable data={data} />}
      {isLoading && <LinearProgress />}
     
    
    </>
  );
};