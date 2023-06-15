import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';


/**
 * Expects at least two columns content
 */
export const DetailsContainer = ({
  children,
  isSubtle,
}:{
  children: ReactNode
  isSubtle?: boolean
}) => (
  <Stack
    py={2} 
    bgcolor={'white'} 
    border={1}
    borderColor={grey[200]}
    borderRadius={2}
    spacing={isSubtle ? 0 : 2}
    justifyContent={'space-between'}
  >

    {children}
  </Stack>
);