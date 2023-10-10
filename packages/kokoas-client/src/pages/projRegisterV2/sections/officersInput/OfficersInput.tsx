import { Stack } from '@mui/material';
import { EmployeeSelectFields } from './EmployeeSelectFields';
import { Store } from './Store';




export const OfficersInput = () => {


  return (
    <Stack 
      spacing={2}
    >
      <Store />
      <EmployeeSelectFields name='yumeAG' agentType='yumeAG' required />
      <EmployeeSelectFields name='cocoAG' agentType='cocoAG' />
      <EmployeeSelectFields name='cocoConst' agentType='cocoConst' />

    </Stack>
  );
};