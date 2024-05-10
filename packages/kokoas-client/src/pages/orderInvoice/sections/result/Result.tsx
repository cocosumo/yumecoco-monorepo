import { LinearProgress } from '@mui/material';
import { useSearchResult } from '../../hooks/useSearchResult';
import { ResultTable } from './ResultTable';

export const Result = () => {

  const { data, isLoading } = useSearchResult();
  
  return (
    <>

      {!isLoading &&  <ResultTable data={data} />}
      {isLoading && <LinearProgress />}
     
    
    </>
  );
};