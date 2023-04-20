import { Box } from '@mui/material';
import { getRecordInstance } from 'api-kintone';
import { useAtom } from 'jotai';
import { recordAtom } from './Main';
import { useEffect } from 'react';

export const AndpadDetails = () => {
  const [recordState, setRecordState] = useAtom(recordAtom);
  useEffect(() => {
    if (!recordState) {
      setRecordState(getRecordInstance() as { record: DB.SavedRecord });
    }
  }, [recordState, setRecordState]);

  console.log('recordState', recordState);
  return (
    <Box>
      Hello
    </Box>
  );
};