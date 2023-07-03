import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const ListItemLayout = ({
  createDate,
  branchNum,
}:{
  createDate: ReactNode,
  branchNum: ReactNode,
}) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
    >
      <Typography variant='caption'>
        {createDate}
      </Typography>
      <Typography variant='caption'>
        {branchNum}
      </Typography>
    </Stack>
  );
};