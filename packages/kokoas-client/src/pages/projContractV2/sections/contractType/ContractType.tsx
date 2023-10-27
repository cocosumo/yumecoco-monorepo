import { Collapse, Stack } from '@mui/material';
import { ContractTypeField } from './ContractTypeField';
import { AdditionalContract } from './AdditionalContract';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { ProjPlanContract } from './projPlanContract/ProjPlanContract';

export const ContractType = () => {

  const contractType = useWatch<TypeOfForm>({
    name: 'contractType',
  }) as string;
  

  return (
    <Stack
      spacing={2}
    >
      <Stack 
        direction={'row'} 
        spacing={2}
      >
        <ContractTypeField />
        {contractType === '追加' && (
        <AdditionalContract />
        )}

      </Stack>

      <Collapse in={contractType === '設計契約'}>
        <ProjPlanContract />
      </Collapse>

    </Stack>
    
  );
};