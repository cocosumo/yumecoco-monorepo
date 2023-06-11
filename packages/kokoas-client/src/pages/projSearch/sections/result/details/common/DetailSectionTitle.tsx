import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export const DetailSectionTitle = ({
  children,
}:{
  children: ReactNode
}) => (
  <Typography 
    variant='caption' 
    color={'GrayText'}
  >
    {children}
  </Typography>
);