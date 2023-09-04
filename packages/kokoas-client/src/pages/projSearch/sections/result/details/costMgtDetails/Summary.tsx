import { Stack } from '@mui/material';
import type { GetCostMgtData } from 'types';

import { SummaryDetails } from './SummaryDetails';
import { Actions } from './Actions';
import { grey } from '@mui/material/colors';

export const Summary = ({
  costMgtData,
  systemId,
}:{
  costMgtData: GetCostMgtData,
  systemId: string,
}) => {

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      py={2}
      px={4}
      bgcolor={'white'} 
      border={1}
      borderColor={grey[200]}
      borderRadius={2}
    >
      
      <SummaryDetails costMgtData={costMgtData} />
      <Actions 
        costMgtData={costMgtData} 
        systemId={systemId}
      />

    </Stack>
   
  );
};

// 税込と記載のない金額は税抜とする