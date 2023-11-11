import { Stack } from '@mui/material';
import { EmployeeSelectFields } from './EmployeeSelectFields';
import { Store } from './Store';
import { CommissionRate } from './CommisionRate';
import { IsNotCocoConstConfirmed } from './IsNotCocoConstConfirmed';

export const OfficersInput = () => {

  return (
    <Stack 
      spacing={2}
    >
      <Store />
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'flex-end'}
      >
        <EmployeeSelectFields 
          name='yumeAG' 
          agentType='yumeAG' 
          required
        />
        <CommissionRate />
      </Stack>
      <EmployeeSelectFields name='cocoAG' agentType='cocoAG' />

      <Stack
        direction={'row'}
        spacing={2}
      >
        <EmployeeSelectFields name='cocoConst' agentType='cocoConst' />
        <IsNotCocoConstConfirmed />
      </Stack>

    </Stack>
  );
};