import { Stack } from '@mui/material';
import { CocoAGSelect } from './CocoAGSelect';

export const CocoAGSelectSet = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <CocoAGSelect 
        name='cocoAG1'
        required
      />
      <CocoAGSelect 
        name='cocoAG2'
      />
    </Stack>

  );
}; 