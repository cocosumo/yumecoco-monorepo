import { DialogContent, Stack } from '@mui/material';
import { Form } from 'react-hook-form';
import { SelectSupplier } from './SelectSupplier';
import { OrderName } from './OrderName';
import { OrderMethod } from './orderMethod/OrderMethod';

export const ORDialogContent = () => {

  return (
    <DialogContent>
      <Form>
        <Stack spacing={2}>
          <SelectSupplier />
          <OrderName />
          <OrderMethod /> 
        </Stack>
      </Form>
    </DialogContent>
  );
};