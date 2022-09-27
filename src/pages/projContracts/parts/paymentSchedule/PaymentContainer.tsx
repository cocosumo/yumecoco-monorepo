import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { OutlinedDiv } from '../../../../components/ui/containers';

export const PaymentContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <Grid item xs={12}>
      <OutlinedDiv label='支払い予定'>
        {children}
      </OutlinedDiv>
    </Grid>
  );
};