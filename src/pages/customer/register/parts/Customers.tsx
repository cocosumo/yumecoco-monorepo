import { Grid } from '@mui/material';
import { PageSubTitle } from '../../../../components/ui/labels';
import { FormikTextField } from '../../../../components/ui/textfield';

export const Customers = () => {
  return (
    <Grid container item xs={6} spacing={2}>
      <PageSubTitle label='契約者１' />
      <Grid item xs={12}>
        <FormikTextField name='custName' label="氏名" placeholder='山田　太郎' />
      </Grid>
      <Grid item xs={12}>
        <FormikTextField name='custNameReading' label="氏名フリガナ" placeholder='ヤマダ　タロウ' />
      </Grid>
     
    </Grid>
  );
};