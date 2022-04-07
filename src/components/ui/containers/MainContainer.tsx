import { Grid } from '@mui/material';

export const MainContainer : React.FC = ({ children }) => {
  return (
    <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
      {children}
    </Grid>
  );
};

export default MainContainer;


