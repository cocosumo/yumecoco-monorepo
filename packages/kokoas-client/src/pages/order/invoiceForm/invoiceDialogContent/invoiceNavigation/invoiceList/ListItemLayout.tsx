import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface ListItemLayoutProps {
  invoiceDueDate: ReactNode;
  invoiceAmount: ReactNode;
}

export const ListItemLayout = ({
  invoiceDueDate,
  invoiceAmount,
}: ListItemLayoutProps) => {

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
    >
      <Typography 
        fontSize={10} 
        textAlign={'left'} 
        width={'40%'}
        noWrap
      >
        {invoiceDueDate}
      </Typography>
      <Typography 
        fontSize={10} 
        textAlign={'right'} 
        width={'60%'}
        noWrap
      >
        {invoiceAmount}
      </Typography>
    </Stack>
  );
};