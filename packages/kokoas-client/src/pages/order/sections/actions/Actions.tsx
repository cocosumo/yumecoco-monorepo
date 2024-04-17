import { Stack } from '@mui/material';
import { CopyEstimates } from './copyEstimates/CopyEstimates';
import { OrderSelected } from './OrderSelected';
import { DeleteRows } from './deleteRows/DeleteRows';

export const Actions = () => {
  return (
    <Stack
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Stack 
        spacing={2}
        direction={'row'}
      >

        <OrderSelected  />
        <CopyEstimates />

      </Stack>

      <DeleteRows />

    </Stack>
  );
};