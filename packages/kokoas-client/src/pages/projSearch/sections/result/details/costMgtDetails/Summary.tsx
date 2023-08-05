import { Stack } from '@mui/material';
import type { GetCostMgtData } from 'types';
import { SummaryInfo } from './SummaryInfo';
import { grey } from '@mui/material/colors';

export const Summary = ({
  costMgtData,
}:{
  costMgtData: GetCostMgtData
}) => {
  const {
    受注金額_税抜,
    追加金額_税抜,
    発注金額_税抜,
    支払金額_税抜,

    予定利益率,
    予定利益額,
    実利益率,
    実利益額,

    受注額計_税抜,
    // 請求額計

    入金額,
    未入金,
  } = costMgtData;

  return (
    <Stack 
      spacing={8}
      direction='row'
      width={'100%'}
      p={4}
      bgcolor={'white'} 
      border={1}
      borderColor={grey[200]}
      borderRadius={2}
    >
      <Stack 
        spacing={1}
        flex={0.2}
      >
        <SummaryInfo 
          label='受注金額'
          value={受注金額_税抜}
        />
        <SummaryInfo 
          label='追加金額'
          value={追加金額_税抜}
        />
        <SummaryInfo 
          label='発注金額'
          value={発注金額_税抜}
        />
        <SummaryInfo 
          label='支払金額'
          value={支払金額_税抜}
        />
      </Stack>
      <Stack
        flex={0.25}
      >
        <SummaryInfo 
          label='予定粗利'
          value={予定利益率}
          suffix='%'
          secondaryValue={予定利益額}
        />

        <SummaryInfo 
          label='実粗利'
          value={実利益率}
          secondaryValue={実利益額}
          suffix='%'
        />


      </Stack>
      <Stack
        flex={0.2}
      >
        
        <SummaryInfo 
          label='受注額計'
          value={受注額計_税抜}
        />

        {/*         <SummaryInfo 
          label='請求額計'
          value={実利益率}
        /> */}


        <SummaryInfo 
          label='入金額'
          value={入金額}
        />
        <SummaryInfo 
          label='未入金額'
          value={未入金}
        />

      
      </Stack>

    </Stack>
  );
};