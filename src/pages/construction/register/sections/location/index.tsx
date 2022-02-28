import PageSubTitle from '../../../../../components/ui/labels/PageSubTitle';
import ConstructionSearch from './parts/ConstructionSearch';
import { Grid, TextField } from '@mui/material';

const ConstructionLocation = () => {
  return (
    <>
      <PageSubTitle label="工事場所情報"/>
      <ConstructionSearch/>
      <Grid container item xs={12} md={4}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth name="post" label="郵便番号" />
        </Grid>

        <Grid item xs={12} md={7}>
          <TextField fullWidth name="post" label="郵便番号" />
        </Grid>

      </Grid>


    </>
  );
};


export default ConstructionLocation;