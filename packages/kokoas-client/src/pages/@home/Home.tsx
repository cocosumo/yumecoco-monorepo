import { Grid } from '@mui/material';
import { MainContainer } from 'kokoas-client/src/components';
import { SystemUpdate } from './sections/systemUpdate/SystemUpdate';

export const Home = () => {
  return (
    <MainContainer justifyContent={'center'}>
      <Grid item xs={6}>
        <SystemUpdate />
      </Grid>
    </MainContainer>
  );
};