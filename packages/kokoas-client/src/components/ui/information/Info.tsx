import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { StackProps } from '@mui/system';
import { ReactNode } from 'react';

export interface InfoProps {
  label: string,
  value: ReactNode,
}

export const Info = ({
  label,
  value,
  justifyContent,
}: InfoProps & {
  justifyContent?: StackProps['justifyContent']
}) => (
  <Stack 
    direction={'row'}
    justifyContent={justifyContent}
  >
    <Typography color={grey[600]} width={'200px'}>
      {label}
    </Typography>
    <Typography variant='body1' component={'span'}>
      {value}
    </Typography>
  </Stack>
);