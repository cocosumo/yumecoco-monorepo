import { Grid, Stack } from '@mui/material';
import { ResultsCount } from './ResultsCount';
import { ResultsFormat } from './ResultsFormat';
import { ResultsCardFormat } from './resultCardFormat/ResultsCardFormat';
import { ComponentProps, useState } from 'react';
import { ResultsTableFormat } from './resultsTableFormat/ResultsTableFormat';

export const Results = () => {
  const [format, setFormat] = useState<ComponentProps<typeof ResultsFormat>['format']>('table');

  const handleFormat = (
    _ : React.MouseEvent<HTMLElement>,
    newFormat: typeof format,
  ) => {
    setFormat(prev => newFormat ?? prev );
  };


  return (
    <>
      <Grid item xs={12} spacing={2} >
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          alignItems={'flex-end'}
        >
          <ResultsCount resultCount={100} />
          <ResultsFormat format={format} handleFormat={handleFormat} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {format === 'card' && <ResultsCardFormat />}
        {format === 'table' && <ResultsTableFormat />}
      </Grid>
    </>
  );
};