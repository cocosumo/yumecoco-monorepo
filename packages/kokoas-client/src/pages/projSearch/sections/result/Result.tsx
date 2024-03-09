import { LinearProgress, Stack } from '@mui/material';
import { useSearchResult } from '../../hooks/useSearchResult';
import { ResultCount } from './ResultCount';
import { ResultTable } from './ResultTable';
import { NewCustomerButton } from './NewCustomerButton';
import { DownloadResult } from './DownloadResult';
import { LocalizationProvider } from '@mui/x-date-pickers';
import jaLocale from 'date-fns/locale/ja';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const Result = () => {

  const { 
    data = [], 
    isLoading, 
  } = useSearchResult();
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={jaLocale}>
      <Stack 
        justifyContent={'space-between'}
        alignItems={'center'}
        direction='row'
      >

        <ResultCount count={data?.length ?? 0} />

        <Stack
          direction='row'
          alignItems={'center'}
          spacing={2}
        >
          <DownloadResult data={data} />
          <NewCustomerButton />

        </Stack>


      </Stack>
      {!isLoading &&  <ResultTable data={data} />}
      {isLoading && <LinearProgress />}
     
    
    </LocalizationProvider>
  );
};