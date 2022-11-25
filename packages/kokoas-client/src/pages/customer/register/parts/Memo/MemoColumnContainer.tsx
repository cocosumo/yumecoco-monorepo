import { Grid, Stack } from '@mui/material';
import { ReactNode } from 'react';

export const MemoColumnContainer = ({ 
  children, 
}: { 
  children: ReactNode 
}) => {
  return (
    <Grid item xs={12} lg={6}
      xl={6}
    >
      <Stack spacing={2} direction={'column'}>
        {children}
      </Stack>
    </Grid>
  );
};