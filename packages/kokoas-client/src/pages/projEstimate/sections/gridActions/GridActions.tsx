import { Stack } from '@mui/material';
import { InsertRow } from './InsertRow';

export const GridActions = () => {
  return (
    <Stack 
      direction="row"
      spacing={2}
    >
      <InsertRow />
      
      {/* More functionalities here */}
    </Stack>
  );
};