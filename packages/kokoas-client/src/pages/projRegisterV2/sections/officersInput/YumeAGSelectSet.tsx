import { Stack } from '@mui/material';
import { YumeAGSelect } from './YumeAGSelect';

export const YumeAGSelectSet = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <YumeAGSelect 
        name='yumeAG1'
      />
      <YumeAGSelect 
        name='yumeAG2'
      />
    </Stack>

  );
}; 