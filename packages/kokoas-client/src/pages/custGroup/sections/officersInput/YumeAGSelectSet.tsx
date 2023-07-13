import { Stack } from '@mui/material';
import { YumeAGSelect } from './YumeAGSelect';
import { useTypedWatch } from '../../hooks/useTypedHooks';

export const YumeAGSelectSet = () => {
  const [
    yumeAG1,
    yumeAG2,
  ] = useTypedWatch({
    name: [
      'yumeAG1',
      'yumeAG2',
    ],
  });

  return (
    <Stack direction={'row'} spacing={2}>
      <YumeAGSelect 
        name='yumeAG1'
        required
      />
      {(yumeAG1 || yumeAG2) && (
      <YumeAGSelect 
        name='yumeAG2'
      />
      )}

    </Stack>

  );
}; 