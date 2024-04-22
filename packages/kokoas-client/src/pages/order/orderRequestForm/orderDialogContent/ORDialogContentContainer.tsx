import { ReactNode } from 'react';
import { DialogContent, Stack } from '@mui/material';
import { Form } from 'react-hook-form';

export const ORDialogContentContainer = ({
  children,
}:{
  children: ReactNode;
}) => {
  return (
    <DialogContent dividers sx={{ height: '80vh' }}>
      <Form noValidate>
        <Stack spacing={2}>
          {children}
        </Stack>
      </Form>
    </DialogContent>
  );
};
