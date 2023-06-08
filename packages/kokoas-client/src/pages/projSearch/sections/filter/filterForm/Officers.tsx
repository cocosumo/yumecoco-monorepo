import { FormGroup, FormLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const Officers = () => {
  return (
    <FormGroup>
      <FormLabel>
        担当者
      </FormLabel>

      <Grid container mt={1} spacing={2}>
        <Grid xs>
          <TextField fullWidth size="small" label="ここすも担当者" />
        </Grid>
        <Grid xs>
          <TextField fullWidth size="small" label="ゆめてつAG" />
        </Grid>
      </Grid>
    </FormGroup>
  );
};