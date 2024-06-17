import { Stack } from '@mui/material';
import { InsertRow } from './InsertRow';
import { DeleteRows } from './DeleteRows';

export const GridActions = () => {
  return (
    <Stack 
      direction="row"
      justifyContent={'space-between'}
    >
      <InsertRow />
      <DeleteRows />
      {/* More functionalities here */}
    </Stack>
  );
};