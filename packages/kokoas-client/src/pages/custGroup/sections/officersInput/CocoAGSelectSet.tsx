import { Stack } from '@mui/material';
import { CocoAGSelect } from './CocoAGSelect';
import { useTypedWatch } from '../../hooks/useTypedHooks';

export const CocoAGSelectSet = () => {
  const [
    cocoAG1,
    cocoAG2,
  ] = useTypedWatch({
    name: [
      'cocoAG1',
      'cocoAG2',
    ],
  });


  return (
    <Stack direction={'row'} spacing={2}>
      <CocoAGSelect 
        name='cocoAG1'
        required
      />
      {(cocoAG1 || cocoAG2) && (
      <CocoAGSelect 
        name='cocoAG2'
      />)}
  
    </Stack>

  );
}; 