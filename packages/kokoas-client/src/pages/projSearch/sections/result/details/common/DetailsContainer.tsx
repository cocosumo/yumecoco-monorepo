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
    p={2} 
    bgcolor={'white'} 
    borderRadius={2}
    direction={'row'}
    spacing={2}
    justifyContent={'space-between'}
  >

    {children}
  </Stack>
);