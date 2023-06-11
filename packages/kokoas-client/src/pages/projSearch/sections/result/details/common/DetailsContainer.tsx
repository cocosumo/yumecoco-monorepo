import { Stack } from '@mui/material';
import { ReactNode } from 'react';


/**
 * Expects at least two columns content
 */
export const DetailsContainer = ({
  children,
}:{
  children: ReactNode
}) => (
  <Stack
    py={2} 
    bgcolor={'white'} 
    borderRadius={2}
    spacing={2}
    justifyContent={'space-between'}
  >

    {children}
  </Stack>
);