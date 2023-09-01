import { FormHelperText, Stack } from '@mui/material';
import type { GetCostMgtData } from 'types';
import { SummaryInfo } from './SummaryInfo';
import { roundTo } from 'libs';


export const SummaryDetails = ({
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

    受注額計_税込,
    // 請求額計

    入金額,
    未入金,
    
  } = costMgtData;
  
  return (
    <Stack 
      spacing={12}
      direction='row'
      justifyContent={'space-between'}
    >
      <Stack 
        spacing={1}
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
        spacing={1}
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
        spacing={1}
        flex={0.2}
      >
        
        <SummaryInfo 
          label='受注額計（税込）'
          value={roundTo(受注額計_税込)}
        />

        {/*         <SummaryInfo 
          label='請求額計'
          value={実利益率}
        /> */}


        <SummaryInfo 
          label='入金額（税込）'
          value={入金額}
        />
        <SummaryInfo 
          label='未入金額（税込）'
          value={roundTo(未入金)}
        />

        <FormHelperText
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          ※ 税込と記載のない金額は税抜とする
        </FormHelperText>

      
      </Stack>

    </Stack>
  );
};