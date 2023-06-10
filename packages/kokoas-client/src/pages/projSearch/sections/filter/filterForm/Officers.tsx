import { FormGroup, FormLabel, Stack } from '@mui/material';
import { CocoOfficer } from './CocoOfficer';
import { YumeOfficer } from './YumeOfficer';
import { IncludeRetired } from './IncludeRetired';

export const Officers = () => {


  return (
    <FormGroup>
      <Stack spacing={2} direction="row">

        <FormLabel 
          sx={{ py: 2 }} // align with checkbox
        >
          担当者
        </FormLabel>
        <IncludeRetired />

      </Stack>

      <Stack 
        mt={1} 
        spacing={2} 
        direction={{ xs: 'column', sm: 'row' }}
      >
        <CocoOfficer />
        <YumeOfficer />
      </Stack>
    </FormGroup>
  );
};