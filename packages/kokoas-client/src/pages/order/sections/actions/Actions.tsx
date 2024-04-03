import { Stack } from '@mui/material';
import { CopyEstimates } from './copyEstimates/CopyEstimates';

export const Actions = () => {
  return (
    <Stack
      spacing={2}
      alignItems={'flex-start'}
    >
      {/* TODO: ADD more Buttons */}
      <CopyEstimates />

    </Stack>
  );
};