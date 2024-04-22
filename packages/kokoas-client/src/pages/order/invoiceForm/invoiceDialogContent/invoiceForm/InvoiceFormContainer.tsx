import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export const InvoiceFormContainer = ({
  children,
}:{ 
  children: ReactNode
}) => {
  
  return (
    <Stack 
      spacing={2} 
      height={'100%'}
      p={2}
      flexGrow={1}
      sx={{
        overflowX: 'hidden',
      }}
    >
      {children}
    </Stack>
  );
};