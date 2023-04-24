import { Box, Grid } from '@mui/material';
import { blue } from '@mui/material/colors';

export const LogDisplay = () => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          bgcolor: blue[50],
          p: 2,
        }}
      >
        LogDisplay
      </Box>
    </Grid>
  );
};