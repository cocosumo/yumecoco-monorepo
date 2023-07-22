import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export const CustomerSectionContainer = ({
  children,
  maxWidth = 600,
}:{
  children: ReactNode
  maxWidth?: number
}) => {
  return (
    <Stack
      spacing={2}
      maxWidth={maxWidth}
      px={2}
      pb={2}
    >
      {children}
    </Stack>
  );
};