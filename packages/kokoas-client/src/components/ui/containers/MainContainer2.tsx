import Grid from '@mui/material/Unstable_Grid2';
import { Grid2Props } from '@mui/material';


/** 新Grid2を使ったMainContainer */
export const MainContainer2 = (props: Grid2Props) => {
  return (
    <Grid container
      spacing={2}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      mb={2}
      {...props}
    />
  );
};

