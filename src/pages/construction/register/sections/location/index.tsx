import PageSubTitle from '../../../../../components/ui/labels/PageSubTitle';
import ConstructionSearch from './parts/ConstructionSearch';
import { Grid } from '@mui/material';
import { FormikLabeledCheckBox } from '../../../../../components/ui/checkboxes';
import BuildingType from './parts/BuildingType';
import { FormikTextField } from '../../../../../components/ui/textfield';

const ConstructionLocation = () => {
  return (
    <>
      <PageSubTitle label="工事場所情報"/>
      <ConstructionSearch/>


      <Grid item xs={12} md={3}>
        <FormikTextField name="post" label="郵便番号" />
      </Grid>

      <Grid item md={9}/>

      <Grid item xs={12} md={8}>
        <FormikTextField name="address" label="住所" />
      </Grid>

      <Grid item xs={12} md={8}>
        <FormikTextField name="address2" label="住所（番地以降）" />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormikLabeledCheckBox label="仮換地地番を入力する" name='addressKari' />
      </Grid>

      <Grid item xs={12} md={8}>
        <BuildingType/>
      </Grid>



    </>
  );
};


export default ConstructionLocation;