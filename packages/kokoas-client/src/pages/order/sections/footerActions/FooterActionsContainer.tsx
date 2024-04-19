import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';

export const FooterActionsContainer = ({
  children,
}:{
  children: ReactNode
}) => {

  return (
    <Box 
      component={Paper}
      py={1}
      px={2} 
      position={'sticky'}
      bottom={8}
      elevation={4}
      zIndex={50}
      sx={{
        transition: 'all 0.3s ease-in-out',
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      {children}
    </Box>
  );
};