import { Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';
import { TotalAmount } from './sections/TotalAmount';

export const FormInput = () => {
  return (
    <Grid 
      item xs={12}
    >
      <PageSubTitle label={'合計金額'} />
      <TotalAmount />
    </Grid>
  );
};