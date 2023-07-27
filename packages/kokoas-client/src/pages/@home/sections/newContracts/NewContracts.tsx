import { Button, Stack } from '@mui/material';
import { NewContractsTable } from './NewContractsTable';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';


export const NewContracts = () => {

  const navigate = useNavigateWithQuery();

  return (
    <Stack
      spacing={2}
    >
      <NewContractsTable />
      <Button
        onClick={() => navigate('projContractSearch')}
      >
        契約一覧を見る
      </Button>
    </Stack>
    
  );
 
};