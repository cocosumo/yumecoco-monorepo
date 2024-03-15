import { Alert, Stack, StackProps } from '@mui/material';
import { SelectWithOthers } from './SelectWithOthers';
import { forwardRef } from 'react';
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
      <Alert 
        color='warning'
      >
        検証段階です。内容をよく確認して、ご利用ください。不具合がありましたら、お手数ですが。システム管理者にご連絡ください。
      </Alert>
      <SelectWithOthers name='purpose' />
      <SelectWithOthers name='structure' />
      <SelectWithOthers name='scale' />
      <ProjPeriod />
      <Annotation />
    </Stack>
  );
});

ProjPlanContract.displayName = 'ProjPlanContract';