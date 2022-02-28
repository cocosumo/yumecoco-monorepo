
import MainContainer from '../../../components/ui/containers/MainContainer';
import PageTitle from '../../../components/ui/labels/PageTitle';
import ConstructionInfo from './sections/ConstructionInfo';
import CustInfo from './sections/CustInfo';
import Foot from './sections/foot';
import ConstructionLocation from './sections/location';
import { Button, Divider, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const ConstructionRegister  = () => {


  return (
    <MainContainer>
      <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
      <CustInfo/>
      <ConstructionInfo />
      <ConstructionLocation/>

      <Grid item xs={12}><Divider/></Grid>

      <Grid container item xs={12} justifyContent="center">
        <Button variant="contained" size="large" startIcon={<SaveIcon/>}>登録</Button>
      </Grid>

      <Foot/>
    </MainContainer>
  );
};

export default ConstructionRegister;