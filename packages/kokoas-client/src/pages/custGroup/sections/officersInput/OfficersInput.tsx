import { Stack } from '@mui/material';
import { YumeAGSelectSet } from './YumeAGSelectSet';
import { CocoAGSelectSet } from './CocoAGSelectSet';
import { StoreSelect } from './StoreSelect';

export const OfficersInput = () => {

  return (
    <Stack spacing={2}>
      <StoreSelect />
      <YumeAGSelectSet />

      <CocoAGSelectSet />

    </Stack>
  );
};