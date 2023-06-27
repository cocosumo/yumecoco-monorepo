import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const StaticContentContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <Stack 
      bgcolor='white'
      p={4}
      border={1}
      borderColor={grey[300]}
      borderRadius={1}
      spacing={2}
    >
      {children}

    </Stack>
  );
};