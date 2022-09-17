import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { OutlinedDiv } from '../../../../components/ui/containers';

export const PreviewContainer = ({ children }:{ children: ReactNode }) => (
  <Grid item xs={12} >
    <OutlinedDiv label="プレビュー">
      <Grid container justifyContent={'flex-end'} alignContent={'flex-start'}
        spacing={2} p={2}
      >
        {children}
      </Grid>
    </OutlinedDiv>
  </Grid>
);