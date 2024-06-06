import { Stack, Typography } from '@mui/material';
import { StackProps } from '@mui/system';
import { ReactNode } from 'react';

export const Info = ({
  label,
  value,
  justifyContent,
}: {
  label: string,
  value: ReactNode,
  justifyContent?: StackProps['justifyContent']
}) => (
  <Stack 
    direction={'row'}
    justifyContent={justifyContent}
  >
    <Typography variant='caption' width={'15%'}>
      {label}
    </Typography>
    <Typography variant='body1' component={'span'}>
      {value}
    </Typography>
  </Stack>
);