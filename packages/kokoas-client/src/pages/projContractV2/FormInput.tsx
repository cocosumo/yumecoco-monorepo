import { Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';
import { TotalAmount } from './sections/TotalAmount';
import { PaymentSchedule } from './sections/PaymentSchedule';
import { ConstructionPeriods } from './sections/ConstructionPeriods';
import { CustomerDetails } from './sections/CustomerDetails';

export const FormInput = () => {
  return (
    <Grid 
      container 
      item
      spacing={4}
    >
      <PageSubTitle label={'顧客情報'} />
      <Grid item xs={12}>
        <CustomerDetails />
      </Grid>

      <PageSubTitle label={'合計金額'} />
      <Grid item xs={12}>
        <TotalAmount />
      </Grid>

      <PageSubTitle label={'支払い予定'} />
      <Grid item xs={12}>
        <PaymentSchedule />
      </Grid>

      <PageSubTitle label={'工期'} />
      <Grid item xs={12}>
        <ConstructionPeriods />
      </Grid>


    </Grid>
  );
};