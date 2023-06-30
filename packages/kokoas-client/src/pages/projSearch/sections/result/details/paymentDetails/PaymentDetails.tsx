import { Stack } from '@mui/material';
import { PayTable } from './paymentsTable/PayTable';

export const PaymentDetails  = ({
  projId,
}:{
  projId: string,
}) => {
  return (
    <Stack 
      spacing={2}
      p={2}
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <PayTable />


    </Stack>
  );
};