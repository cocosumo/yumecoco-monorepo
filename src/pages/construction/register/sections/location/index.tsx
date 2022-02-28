import PageSubTitle from '../../../../../components/ui/labels/PageSubTitle';
import ConstructionSearch from './parts/ConstructionSearch';
import { Grid, TextField } from '@mui/material';
import LabeledCheckBox from '../../../../../components/ui/checkboxes/LabeledCheckBox';
import BuildingType from './parts/BuildingType';

const ConstructionLocation = () => {
  return (
    <>
      <PageSubTitle label="工事場所情報"/>
      <ConstructionSearch/>


      <Grid item xs={12} md={3}>
        <TextField fullWidth name="post" label="郵便番号" />
      </Grid>

      <Grid item md={9}/>

      <Grid item xs={12} md={8}>
        <TextField fullWidth name="address" label="住所" />
      </Grid>

      <Grid item xs={12} md={8}>
        <TextField fullWidth name="address2" label="住所（番地以降）" />
      </Grid>

      <Grid item xs={12} md={4}>
        <LabeledCheckBox label="仮換地地番を入力する" />
      </Grid>

      <Grid item xs={12} md={8}>
        <BuildingType/>
      </Grid>



    </>
  );
};


export default ConstructionLocation;