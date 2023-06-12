import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const ListItemLayout = ({
  status,
  contractDate,
  contractAmount,
}:{
  status: ReactNode,
  contractDate: ReactNode,
  contractAmount: ReactNode,
}) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      py={1}
    >
      <Typography variant='caption' width={'30px'}>
        {status}
      </Typography>
      <Typography variant='caption' width={'50px'}>
        {contractDate}
      </Typography>
      <Typography variant='caption'>
        {contractAmount}
      </Typography>
    </Stack>
  );
};