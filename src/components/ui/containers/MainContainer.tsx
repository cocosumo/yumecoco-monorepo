import { Grid } from '@mui/material';

const MainContainer : React.FC = ({ children }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {children}
    </Grid>
  );
};

export default MainContainer;


