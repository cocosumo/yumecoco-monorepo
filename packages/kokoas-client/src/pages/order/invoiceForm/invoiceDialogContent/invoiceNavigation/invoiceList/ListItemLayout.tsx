import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface ListItemLayoutProps {
  invoiceDeadlineDate: ReactNode;
  invoiceAmount: ReactNode;
}

export const ListItemLayout = ({
  invoiceDeadlineDate,
  invoiceAmount,
}: ListItemLayoutProps) => {

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
    >
      <Typography fontSize={10} textAlign={'left'} width={'35%'}>
        {invoiceDeadlineDate}
      </Typography>
      <Typography fontSize={10} textAlign={'right'} width={'65%'}>
        {invoiceAmount}
      </Typography>
    </Stack>
  );
};