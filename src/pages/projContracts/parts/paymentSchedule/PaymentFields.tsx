import { Grid } from '@mui/material';
import { PaymentField } from './PaymentField';


export const PaymentFields = () => {
  return (
    <Grid container justifyContent={'center'} spacing={2}>
      <Grid item xs={8}>
        <PaymentField />
      </Grid>
      <Grid item xs={8}>
        <PaymentField />
      </Grid>
      <Grid item xs={8}>
        <PaymentField />
      </Grid>
      <Grid item xs={8}>
        <PaymentField />
      </Grid>
    </Grid>
  );
};