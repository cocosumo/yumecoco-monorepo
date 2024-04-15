import { Stack } from '@mui/material';
import { CopyEstimates } from './copyEstimates/CopyEstimates';
import { OrderSelected } from './OrderSelected';

export const Actions = () => {
  return (
    <Stack
      spacing={2}
      alignItems={'flex-start'}
      direction={'row'}
    >
      <OrderSelected  />
      <CopyEstimates />

    </Stack>
  );
};