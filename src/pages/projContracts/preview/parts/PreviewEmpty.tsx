import { Grid, Typography } from '@mui/material';

export const PreviewEmpty = () => {
  return (
    <Grid item xs={12}>
      <Typography variant='body2'  fontSize={24} textAlign="center">
        There is no project selected.
      </Typography>
    </Grid>
  );
};