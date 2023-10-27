import { Stack } from '@mui/material';
import { SelectWithOthers } from './SelectWithOthers';
import { forwardRef } from 'react';
import { StackProps } from '@mui/system';
import { ProjPeriod } from './ProjPeriod';
import { Annotation } from './Annotation';


/* Need to forward ref for MUI transtition */
export const ProjPlanContract = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  
  return (
    <Stack
      spacing={2}
      ref={ref}
      {...props}
      maxWidth={600}
    >
      <SelectWithOthers name='purpose' />
      <SelectWithOthers name='structure' />
      <SelectWithOthers name='scale' />
      <ProjPeriod />
      <Annotation />
    </Stack>
  );
});

ProjPlanContract.displayName = 'ProjPlanContract';