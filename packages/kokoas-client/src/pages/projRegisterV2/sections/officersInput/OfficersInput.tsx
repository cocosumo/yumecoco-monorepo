import { Stack } from '@mui/material';
import { CocoConstSelect } from './CocoConstSelect';
import { YumeAGSelect } from './YumeAGSelect';
import { CocoAGSelect } from './CocoAGSelect';

export const OfficersInput = () => {
  return (
    <Stack spacing={2}>

      <Stack direction={'row'} spacing={2}>
        <YumeAGSelect 
          name='yumeAG1'
        />
        <YumeAGSelect 
          name='yumeAG2'
        />
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <CocoAGSelect 
          name='cocoAG1'
        />
        <CocoAGSelect 
          name='cocoAG2'
        />
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <CocoConstSelect 
          name='cocoConst1'
        />
        <CocoConstSelect 
          name='cocoConst2'
        />
      </Stack>

    </Stack>
  );
};