import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { PlanContractInfo } from './PlanContractInfo';
import { ContractList } from './ContractList';
import { IContracts } from 'types';
import { TotalContractAmt } from './TotalContractAmt';



export const ContractInfo = () => {

  const [
    projId,
  ] = useTypedWatch({
    name: [
      'projId',
    ],
  }) as [string, string[]];

  const { data = [] } = useContractsByProjIdV2(projId);

  const hasExcludedPlanContractAmt = data.some(({ includePlanContractAmt, contractType }) =>
    (includePlanContractAmt.value === '1') && (contractType.value === '契約'));

  let validContracts = data;
  let planContract = [] as IContracts[];
  if (hasExcludedPlanContractAmt) {
    validContracts = data.filter(({ contractType }) => contractType.value !== '設計契約');
    planContract = data.filter(({ contractType }) => contractType.value === '設計契約');
  }


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
          <PlanContractInfo excludedPlanContract={planContract} />}

      </Stack>
      <TotalContractAmt contracts={validContracts} />
    </Stack>
  );
};
