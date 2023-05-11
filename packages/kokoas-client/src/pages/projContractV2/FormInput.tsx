import { Divider, Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';
import { TotalAmount } from './sections/TotalAmount';
import { PaymentSchedule } from './sections/PaymentSchedule';
import { ConstructionPeriods } from './sections/ConstructionPeriods';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from './schema';
import { AmountDetails } from './parts/AmountDetails';

export const FormInput = () => {

  const envelopeStatus = useWatch<TypeOfForm>({
    name: 'envelopeStatus',
  });

  const hasContract = !!envelopeStatus;

  return (
    <Grid 
      container 
      item
      spacing={4}
    >
      <PageSubTitle label={'合計金額'} />
      <Grid item xs={12} md={4}>
        <TotalAmount disabled={hasContract} />
      </Grid>

      <Grid item xs={12} md={4}>
        <AmountDetails />
      </Grid>

      <PageSubTitle label={'支払い予定'} />
      <Grid item xs={12}>
        <PaymentSchedule disabled={hasContract} />
      </Grid>

      <PageSubTitle label={'工期'} />
      <Grid item xs={12}>
        <ConstructionPeriods disabled={hasContract} />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

    </Grid>
  );
};