import { ReactNode } from 'react';
import { DialogContent, Stack } from '@mui/material';
import { Form } from 'react-hook-form';

export const ORDialogContentContainer = ({
  children,
}:{
  children: ReactNode;
}) => {
  return (
    <DialogContent dividers>
      <Form noValidate>
        <Stack spacing={2}>
          {children}
        </Stack>
      </Form>
    </DialogContent>
  );
};
