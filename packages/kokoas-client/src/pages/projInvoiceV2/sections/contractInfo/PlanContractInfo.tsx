import { Stack, Tooltip, Typography } from '@mui/material';
import { ContractList } from './ContractList';
import { grey } from '@mui/material/colors';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useContractsByIds } from 'kokoas-client/src/hooksQuery';


/** 請求に含まない設計契約書を表示します */
export const PlanContractInfo = () => {

  const [
    excludedPlanContracts,
  ] = useTypedWatch({
    name: [
      'excludedPlanContracts',
    ],
  }) as [string[]];


  const { data: excludedPlanContract = [] } = useContractsByIds({ contractIds: excludedPlanContracts });



  return (
    <Stack
      p={1}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      spacing={2}
    >
      <Stack
        direction={'column'}
        justifyContent={'justifyContent'}
        spacing={1}
        minWidth={'230px'}
      >

        <Tooltip
          title={'設計契約を請求に含めたい場合は、"カテゴリ=契約"の契約書の設定を修正してください'}
        >
          <Typography variant='body1' component={'span'}>
            以下の契約書は請求に含みません
          </Typography>
        </Tooltip>
        <ContractList contracts={excludedPlanContract} />
      </Stack>
    </Stack>
  );
};
