import { LinearProgress, Stack } from '@mui/material';
import { useSearchResult } from '../../hooks/useSearchResult';
import { ResultCount } from './ResultCount';
import { ResultTable } from './ResultTable';
import { NewCustomerButton } from './NewCustomerButton';

export const Result = () => {

  const { data, isLoading } = useSearchResult();
  return (
    <>
      <Stack 
        justifyContent={'space-between'}
        alignItems={'center'}
        direction='row'
      >

        <ResultCount count={data?.length ?? 0} />

        <NewCustomerButton />

      </Stack>
      {!isLoading &&  <ResultTable data={data} />}
      {isLoading && <LinearProgress />}
     
    
    </>
  );
};