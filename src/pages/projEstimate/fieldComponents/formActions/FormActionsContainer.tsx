import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const FormActionsContainer = ({
  children,
}: {
  children: ReactNode,
}) => {



  return (
    <Box sx={{ position: 'fixed', top: 72, right: 36, zIndex: 3000, minWidth: '30px' }}>
      {children}
    </Box>
  );

};