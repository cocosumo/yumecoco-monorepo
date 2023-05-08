import { DialogContent, Stack } from '@mui/material';
import { ReactNode } from 'react';

export const FilterDialogContent = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <DialogContent >
      <Stack spacing={2}>
        {children}
      </Stack>
    </DialogContent>
  );
};