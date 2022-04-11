import { Grid } from '@mui/material/node';
import { PageSubTitle } from '../../../../components/ui/labels';
import { FormikSelect } from '../../../../components/ui/selects';
import { CustomerForm, CustomerFormKeys } from '../form';


export const Agents = <T extends CustomerFormKeys>() => {
  return (
    <Grid container item xs={12} md={3} spacing={2}>
      <PageSubTitle label='担当情報'/>
      <Grid item xs={12}>
        <FormikSelect name={'store' as T} label="店舗"/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={'cocoAG1' as T} label="営業担当者1"/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={'cocoAG2' as T} label="営業担当者2"/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={'yumeAG1' as keyof CustomerForm} label="ゆめてつAG1"/>
      </Grid>
      <Grid item xs={12}>
        <FormikSelect name={'yumeAG2' as keyof CustomerForm} label="ゆめてつAG2"/>
      </Grid>
    </Grid>
  );
};