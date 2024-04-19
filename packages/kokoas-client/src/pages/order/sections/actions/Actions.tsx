import { Stack } from '@mui/material';
import { CopyEstimates } from './copyEstimates/CopyEstimates';
import { OrderSelected } from './OrderSelected';
import { DeleteRows } from './deleteRows/DeleteRows';
import { InsertRow } from './insertRow/InsertRow';

export const Actions = () => {
  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Stack 
        spacing={2}
        direction={'row'}
      >

        <OrderSelected  />
        <CopyEstimates />
        <InsertRow />

      </Stack>

      <DeleteRows />

    </Stack>
  );
};