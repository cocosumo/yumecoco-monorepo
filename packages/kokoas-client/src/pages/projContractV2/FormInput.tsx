import { Divider, Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';
import { TotalAmount } from './sections/TotalAmount';
import { PaymentSchedule } from './sections/PaymentSchedule';
import { ConstructionPeriods } from './sections/ConstructionPeriods';
import { CustomerSummary } from './sections/CustomerSummary';
import { FormActions } from './sections/FormActions';
import { ProjectSummary } from './sections/ProjectSummary';

export const FormInput = () => {
  return (
    <Grid 
      container 
      item
      spacing={4}
    >
      <PageSubTitle label={'顧客情報'} />
      <Grid item xs={12}>
        <CustomerSummary />
      </Grid>

      <PageSubTitle label={'工事情報'} />
      <Grid item xs={12}>
        <ProjectSummary />
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

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <FormActions />
      </Grid>

    </Grid>
  );
};