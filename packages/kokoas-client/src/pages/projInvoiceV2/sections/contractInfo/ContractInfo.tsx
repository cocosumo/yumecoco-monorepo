import { useContractsByIds } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { PlanContractInfo } from './PlanContractInfo';
import { ContractList } from './ContractList';
import { TotalContractAmt } from './TotalContractAmt';



export const ContractInfo = () => {

  const [
    hasExcludedPlanContractAmt,
    contractIds,
  ] = useTypedWatch({
    name: [
      'hasExcludedPlanContractAmt',
      'contractIds',
    ],
  }) as [boolean, string[]];

  const { data: validContracts = [] } = useContractsByIds({ contractIds: contractIds });


  return (

    <Stack
      p={2}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      spacing={2}
    >
      <Stack
        direction={'row'}
        justifyContent={'justifyContent'}
      >
        <ContractList contracts={validContracts} maxWidth={'50%'} />
        {hasExcludedPlanContractAmt &&
          <PlanContractInfo />}

      </Stack>
      <TotalContractAmt />
    </Stack>
  );
};
