import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export const CustomerSectionContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <Stack
      spacing={2}
      maxWidth={600}
    >
      {children}
    </Stack>
  );
};