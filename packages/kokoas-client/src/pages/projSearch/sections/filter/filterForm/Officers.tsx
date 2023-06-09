import { Checkbox, FormControlLabel, FormGroup, FormLabel, Stack } from '@mui/material';
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

      <Stack 
        mt={1} 
        spacing={2} 
        direction={{ xs: 'column', sm: 'row' }}
      >
        <CocoOfficer includeRetired={includeRetired} />
        <YumeOfficer includeRetired={includeRetired} />
      </Stack>
    </FormGroup>
  );
};