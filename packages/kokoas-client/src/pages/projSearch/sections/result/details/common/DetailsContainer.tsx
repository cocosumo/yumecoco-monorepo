import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
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
    border={1}
    borderColor={grey[200]}
    borderRadius={2}
    spacing={2}
    justifyContent={'space-between'}
  >

    {children}
  </Stack>
);