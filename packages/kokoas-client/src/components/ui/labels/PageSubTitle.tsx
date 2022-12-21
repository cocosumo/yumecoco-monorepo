import { Divider, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';


interface PageSubTitleProps {
  label: ReactNode
  xs?: number,
}

export const PageSubTitle = (props: PageSubTitleProps) => {
  const {
    label,
    xs = 12,
  } = props;

  return (
    <Grid item xs={xs}>
      <Divider textAlign="left">
        <Typography variant="h6">
          {label}
        </Typography>
      </Divider>
    </Grid>
  );
};

export default PageSubTitle;