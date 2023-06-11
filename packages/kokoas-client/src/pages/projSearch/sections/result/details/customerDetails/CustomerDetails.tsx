import { 
  Stack,
} from '@mui/material';
import { 
  useCustGroupById, 
  useCustomersByCustGroupId, 
} from 'kokoas-client/src/hooksQuery';
import { Customers } from './Customers';
import { AgentDetails } from './AgentDetails';
import { getAgentNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { OtherDetails } from './OtherDetails';
import { parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';


export const CustomerDetails = ({
  custGroupId,
}:{
  custGroupId: string,
}) => {



  const { data: recCustGroup } = useCustGroupById(custGroupId);

  const {
    agents,
    storeName,
    isDeleted,
    作成日時: createDate,
    更新日時: updateDate,
    作成者: createdBy,
    更新者: updatedBy,
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

      <EditButton 
        href={`${pages.custGroupEdit}?${generateParams({ custGroupId })}`}
      />

      {recCust && <Customers customers={recCust} />}

      {recCustGroup && (
        <AgentDetails 
          cocoAgs={cocoAgs || '-'}
          yumeAgs={yumeAgs || '-'}
          storeName={storeName?.value ?? ''}
        />
      )}

      <OtherDetails 
        custGroupId={custGroupId}
        recordStatus={isDeleted?.value === '0' ? '有効' : '削除'}
        createDate={parseISOTimeToFormat(createDate?.value)}
        updateDate={parseISOTimeToFormat(updateDate?.value)}
        createdBy={createdBy?.value.name || '-'}
        updatedBy={updatedBy?.value.name || '-'}
      />
      
     
    </Stack>
  );
};