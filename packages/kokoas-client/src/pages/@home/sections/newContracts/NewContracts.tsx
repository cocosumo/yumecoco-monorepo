import { Button, Stack } from '@mui/material';
import { NewContractsTable } from './NewContractsTable';


export const NewContracts = () => {


  return (
    <Stack
      spacing={2}
    >
      <NewContractsTable />
      <Button>
        契約一覧を見る
      </Button>
    </Stack>
    
  );
 
};