import { Remarks } from './Remarks';
import { PayMethod } from './PayMethod';
import { ScheduledPayDate } from './ScheduledPayDate';
import { Stack } from '@mui/material';



export const RemarksGroup = () => {

  return (
    <Stack direction={'row'} spacing={2}>
      <Stack direction={'column'} spacing={0.5}>
        <PayMethod />
        <ScheduledPayDate />
      </Stack>
      
      <Remarks />
    </Stack>
  );
};
