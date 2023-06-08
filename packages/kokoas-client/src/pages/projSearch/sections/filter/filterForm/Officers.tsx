import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CocoOfficer } from './CocoOfficer';
import { useState } from 'react';

export const Officers = () => {
  const [includeRetired, setIncludeRetired] = useState(false);

  return (
    <FormGroup>
      <FormLabel>
        <Stack spacing={2} direction="row">
          <Box py={2}>
            担当者
          </Box>
          <FormControlLabel 
            control={<Checkbox checked={includeRetired} />} 
            label="退職者を含む"
            onChange={(_, checked) => setIncludeRetired(checked)}
          />
        </Stack>

      </FormLabel>

      <Grid container mt={1} spacing={2}>
        <Grid xs>
          <CocoOfficer includeRetired={includeRetired} />
        </Grid>
        <Grid xs>
          <TextField fullWidth size="small" label="ゆめてつAG" />
        </Grid>
      </Grid>
    </FormGroup>
  );
};