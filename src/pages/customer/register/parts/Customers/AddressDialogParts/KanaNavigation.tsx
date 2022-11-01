import { Stack, Chip } from '@mui/material';
import { MutableRefObject } from 'react';

export const KanaNavigation = (props: {
  kanaKeys : string[]
  kanaRowsRef:  MutableRefObject<(HTMLElement | null)[]>
}) => {
  const { kanaRowsRef, kanaKeys } = props;
  return (
    <Stack direction={'column'} sx={{ position: 'absolute', right: '1rem' }} spacing={1}
      p={1}
    >
      {
      kanaKeys.map((groupKey, kanaIdx) => (
        <Chip
          key={groupKey}
          label={`${groupKey}`}
          size='small'
          onClick={()=>{
            kanaRowsRef.current[kanaIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }}
        />
      ))
    }
    </Stack>
  );
};