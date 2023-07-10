import { Stack } from '@mui/material';
import { CocoConstSelect } from './CocoConstSelect';
import { useTypedWatch } from '../../hooks';

export const CocoConstSelectSet = () => {
  const [
    cocoConst1,
    cocoConst2,
  ] = useTypedWatch({
    name: [
      'cocoConst1',
      'cocoConst2',
    ],
  });


  return (
    <Stack direction={'row'} spacing={2}>
      <CocoConstSelect 
        name='cocoConst1'
      />
      {(cocoConst1 || cocoConst2) && (
      <CocoConstSelect 
        name='cocoConst2'
      />
      )}

    </Stack>

  );
}; 