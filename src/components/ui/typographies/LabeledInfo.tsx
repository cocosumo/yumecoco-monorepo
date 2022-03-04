import { Grid, Typography } from '@mui/material';

interface LabeledInfoProps {
  label: string,
  data?: string
}

const LabeledInfo = ({ label, data }: LabeledInfoProps) =>{

  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <Typography fontWeight={600}  variant='subtitle2'>{label} </Typography>
      </Grid>
      <Grid item xs>
        <Typography >{data} </Typography>
      </Grid>
    </Grid>
  );
};

export default LabeledInfo;