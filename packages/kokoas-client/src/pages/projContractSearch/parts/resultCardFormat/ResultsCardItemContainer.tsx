import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { GrayBox } from '../../../../components/ui/containers';

export const ResultsCardItemContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return  (
    <GrayBox >
      <Stack direction="column" spacing={2}>
        {children}
      </Stack>
    </GrayBox>
  );
};