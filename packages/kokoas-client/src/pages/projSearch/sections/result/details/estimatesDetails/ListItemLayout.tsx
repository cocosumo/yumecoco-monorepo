import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const ListItemLayout = ({
  createDate,
  branchNum,
  estType,
}:{
  createDate: ReactNode,
  branchNum: ReactNode,
  estType: ReactNode,
}) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
    >
      <Typography 
        width={'40%'}
        variant='caption'
      >
        {createDate}
      </Typography>
      <Typography
        width={'25%'}
        variant='caption'
      >
        {branchNum}
      </Typography>
      <Typography 
        width={'35%'}
        variant='caption'
      >
        {estType}
      </Typography>
    </Stack>
  );
};