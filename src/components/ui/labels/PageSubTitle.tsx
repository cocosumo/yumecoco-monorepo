import { Divider, Grid, Typography } from '@mui/material';


interface PageSubTitleProps {
  label: string
}

const PageSubTitle = (props: PageSubTitleProps) => {
  const { label } = props;

  return (
    <Grid item xs={12}>
      <Divider textAlign="left"><Typography variant="h6">{label}</Typography></Divider>
    </Grid>
  );
};

export default PageSubTitle;