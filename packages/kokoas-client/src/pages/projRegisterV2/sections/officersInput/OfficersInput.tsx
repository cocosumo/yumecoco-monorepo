import { Stack } from '@mui/material';
import { EmployeeSelectFields } from './EmployeeSelectFields';
import { Store } from './Store';
import { CommissionRate } from './CommisionRate';




export const OfficersInput = () => {


  return (
    <Stack 
      spacing={2}
    >
      <Store />
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'center'}
      >
        <EmployeeSelectFields name='yumeAG' agentType='yumeAG' required />
        <CommissionRate />
      </Stack>
      <EmployeeSelectFields name='cocoAG' agentType='cocoAG' />
      <EmployeeSelectFields name='cocoConst' agentType='cocoConst' />

    </Stack>
  );
};