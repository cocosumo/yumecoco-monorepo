import { Grid, Grow } from '@mui/material';
import { ReactNode } from 'react';
import { OutlinedDiv } from '../../../../components/ui/containers';

export const ContractInfoContainer = ({
  projId, children,
}: {
  projId: string,
  children: ReactNode
}) => (
  <Grow in={!!projId} mountOnEnter unmountOnExit>
    <Grid item xs={12} >
      <OutlinedDiv label='内容'>

        <Grid container spacing={2} p={2}>
          {children}
        </Grid>
      </OutlinedDiv>
    </Grid>
  </Grow>
);