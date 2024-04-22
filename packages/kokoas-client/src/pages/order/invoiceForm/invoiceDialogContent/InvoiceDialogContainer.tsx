import { DialogContent, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { Form } from 'react-hook-form';

export const InvoiceDialogContainer = ({
  children,
}:{
  children: ReactNode;
}) => {
  return (
    <DialogContent 
      dividers 
      sx={{ 
        height: '80vh', 
        width: '100%',
        p: 0,
      }}
    >
      <Form noValidate 
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Stack 
          direction={'row'} 
          spacing={2}
          height={'100%'}
          width={'100%'}
        >
          {children}
        </Stack>
      </Form>
    </DialogContent>
  );
};