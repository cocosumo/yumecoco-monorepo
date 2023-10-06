import { Stack } from '@mui/material';
import { EmployeeSelectFields } from './EmployeeSelectFields';




export const OfficersInput = () => {


  return (
    <Stack 
      spacing={2}
    >
      <EmployeeSelectFields name='yumeAG' />
      <EmployeeSelectFields name='cocoAG' />
      <EmployeeSelectFields name='cocoConst' />

    </Stack>
  );
};