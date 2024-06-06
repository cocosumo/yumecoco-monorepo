import { Stack, Typography } from '@mui/material';
import { IContracts } from 'types';
import { ContractList } from './ContractList';
import { grey } from '@mui/material/colors';


/** 請求に含まない設計契約書を表示します */
export const PlanContractInfo = ({
  excludedPlanContract,
}: {
  excludedPlanContract: IContracts[]
}) => {



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
        <Typography variant='body1' component={'span'}>
          以下の契約書は請求に含みません
        </Typography>
        <ContractList contracts={excludedPlanContract} />
      </Stack>
    </Stack>
  );
};
