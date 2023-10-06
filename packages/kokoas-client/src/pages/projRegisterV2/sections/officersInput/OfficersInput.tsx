import { Stack } from '@mui/material';
import { EmployeeSelectFields } from './EmployeeSelectFields';




export const OfficersInput = () => {


  return (
    <Stack 
      spacing={2}
    >
      <EmployeeSelectFields name='yumeAG' agentType='yumeAG' />
      {/*  <EmployeeSelectFields name='cocoAG' agentType='cocoAG' />
      <EmployeeSelectFields name='cocoConst' agentType='cocoConst' /> */}

    </Stack>
  );
};