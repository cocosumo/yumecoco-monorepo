import { Grid } from '@mui/material';
import { ComponentProps } from 'react';



export const MainContainer = (props: ComponentProps<typeof Grid>) => {
  const {
    children,
    spacing = 2,
    mb = 12,
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    ...others
  } = props;
  return (
    <Grid container
      {...others}
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      mb={mb}

    >
      {children}
    </Grid>
  );
};

export default MainContainer;


