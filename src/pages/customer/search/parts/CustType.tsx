import { FormikRadio } from '../../../../components/ui/radio';
import { Grid } from '@mui/material';
import { customerTypes } from '../form';


export const CustType = () => {
  return (
    <Grid item xs={12} md={3}>
      <FormikRadio name="custType" label="種別で絞り込む" choices={customerTypes}/>
    </Grid>
  );
};