import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const Info = ({
  label,
  value,
}:{
  label: string,
  value: ReactNode
}) => {
  return (
    <Stack direction={'row'}>
      <Typography width={'20%'} variant='subtitle2'>
        {label}
      </Typography>
      <Typography variant='body1'>
        {value}
      </Typography>
    </Stack>
  );
};