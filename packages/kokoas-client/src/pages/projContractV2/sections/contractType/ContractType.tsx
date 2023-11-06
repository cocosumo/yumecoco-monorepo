import { Collapse, Stack } from '@mui/material';
import { ContractTypeField } from './ContractTypeField';
import { AdditionalContract } from './AdditionalContract';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { ProjPlanContract } from './projPlanContract/ProjPlanContract';
import { SubInputContainer } from './SubInputContainer';

export const ContractType = () => {

  const contractType = useWatch<TypeOfForm>({
    name: 'contractType',
  }) as string;
  

  return (
    <Stack
      bgcolor={'white'}
      borderRadius={2}
      p={4}
    >

      <ContractTypeField />

  
      <Collapse 
        in={contractType === '追加'}
      >
        <SubInputContainer>
          <AdditionalContract />
        </SubInputContainer>
      </Collapse>

      <Collapse 
        in={contractType === '設計契約'}
      >
        <SubInputContainer>
          <ProjPlanContract />
        </SubInputContainer>
      </Collapse>

    </Stack>
    
  );
};