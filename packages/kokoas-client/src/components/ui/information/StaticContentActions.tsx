import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export const StaticContentActions = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      alignContent={'flex-start'}
    >

      {children}
    </Stack>
  );
};