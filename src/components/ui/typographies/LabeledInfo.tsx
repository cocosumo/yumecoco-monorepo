import { Grid, Typography } from '@mui/material';

export interface LabeledInfoProps {
  label: string,
  data?: string
}

export const LabeledInfo = ({ label, data = '' }: LabeledInfoProps) =>{


  return (
    <>
      {Boolean(data) &&

      <Grid container>
        <Grid item xs={12}  sm={4} md={6}>
          <Typography fontWeight={600}  variant='subtitle2'>{label} </Typography>
        </Grid>
        <Grid item xs>
          <Typography >{data} </Typography>
        </Grid>
      </Grid>

      }


    </>

  );
};

export default LabeledInfo;