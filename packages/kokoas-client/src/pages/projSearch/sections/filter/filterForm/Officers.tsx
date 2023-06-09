import { Checkbox, FormControlLabel, FormGroup, FormLabel, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CocoOfficer } from './CocoOfficer';
import { useState } from 'react';
import { YumeOfficer } from './YumeOfficer';

export const Officers = () => {
  const [includeRetired, setIncludeRetired] = useState(false);
  

  return (
    <FormGroup>
      <Stack spacing={2} direction="row">
        <FormLabel 
          sx={{ py: 2 }} // align with checkbox
        >
          担当者
        </FormLabel>
        <FormControlLabel 
          control={<Checkbox checked={includeRetired} />} 
          label="退職者を含む"
          onChange={(_, checked) => setIncludeRetired(checked)}
        />
    
      </Stack>

      <Grid container mt={1} spacing={2}>
        <Grid xs>
          <CocoOfficer includeRetired={includeRetired} />
        </Grid>
        <Grid xs>
          <YumeOfficer includeRetired={includeRetired} />
        </Grid>
      </Grid>
    </FormGroup>
  );
};