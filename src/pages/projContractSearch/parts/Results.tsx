import { Stack } from '@mui/material';
import { ResultsCount } from './ResultsCount';
import { ResultsFormat } from './ResultsFormat';
import { ResultsCardFormat } from './resultCardFormat/ResultsCardFormat';
import { ComponentProps, useState } from 'react';

export const Results = () => {
  const [format, setFormat] = useState<ComponentProps<typeof ResultsFormat>['format']>('table');

  const handleFormat = (
    _ : React.MouseEvent<HTMLElement>,
    newFormat: typeof format,
  ) => {
    setFormat(prev => newFormat ?? prev );
  };


  return (
    <Stack spacing={2} >
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        alignItems={'flex-end'}
      >
        <ResultsCount resultCount={100} />
        <ResultsFormat format={format} handleFormat={handleFormat} />
      </Stack>
      {format === 'card' && <ResultsCardFormat />}

    </Stack>
  );
};