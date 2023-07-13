import { Stack } from '@mui/material';
import { CocoAGSelectSet } from './CocoAGSelectSet';
import { YumeAGSelectSet } from './YumeAGSelectSet';
import { CocoConstSelectSet } from './CocoConstSelectSet';

export const OfficersInput = () => {
  return (
    <Stack spacing={2}>

      <YumeAGSelectSet />

      <CocoAGSelectSet />

      <CocoConstSelectSet />

    </Stack>
  );
};