import { 
  Stack,
} from '@mui/material';
import { 
  useCustGroupById, 
  useCustomersByCustGroupId, 
} from 'kokoas-client/src/hooksQuery';
import { Customers } from './Customers';
import { GeneralDetails } from './GeneralDetails';
import { getAgentNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';

export const CustomerDetails = ({
  custGroupId,
}:{
  custGroupId: string,
}) => {



  const { data: recCustGroup } = useCustGroupById(custGroupId);

  const {
    agents,
    storeName,
  } = recCustGroup ?? {};

  const { data: recCust } = useCustomersByCustGroupId(custGroupId);

  let cocoAgs = '';
  let yumeAgs = '';

  if (agents) {
    cocoAgs = getAgentNamesByType(agents, 'cocoAG');
    yumeAgs = getAgentNamesByType(agents, 'yumeAG');
  }

  return (
    <Stack 
      spacing={2}
    >

      {recCust && <Customers customers={recCust} />}

      {  recCustGroup && (
        <GeneralDetails 
          cocoAgs={cocoAgs || '-'}
          yumeAgs={yumeAgs || '-'}
          storeName={storeName?.value ?? ''}
        />
      )}
      
     
    </Stack>
  );
};