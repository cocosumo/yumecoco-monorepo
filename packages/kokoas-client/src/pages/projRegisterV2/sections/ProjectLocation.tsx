import Grid from '@mui/material/Unstable_Grid2/';
import { CopyProjLocation } from '../parts/CopyProjLocation';
import { Stack } from '@mui/system';

export const ProjectLocation = () => {
  return (
    <Grid xs={12}>
      <Stack spacing={2}>
        <CopyProjLocation />

      </Stack>
    </Grid>

  );
};