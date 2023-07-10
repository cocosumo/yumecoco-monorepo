import { Stack } from '@mui/material';
import { CocoConstSelect } from './CocoConstSelect';

export const CocoConstSelectSet = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <CocoConstSelect 
        name='cocoConst1'
      />
      <CocoConstSelect 
        name='cocoConst2'
      />
    </Stack>

  );
}; 