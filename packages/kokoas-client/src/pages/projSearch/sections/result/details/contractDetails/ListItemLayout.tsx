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
      width={'100%'}
    >
      <Typography variant='caption' textAlign={'left'} width={'20%'}>
        {status}
      </Typography>
      <Typography variant='caption' textAlign={'center'} width={'30%'}>
        {contractDate}
      </Typography>
      <Typography variant='caption' textAlign={'right'} width={'50%'}>
        {contractAmount}
      </Typography>
    </Stack>
  );
};