import { Stack } from '@mui/material';
import { SelectSupplier } from './SelectSupplier';
import { OrderName } from './OrderName';
import { OrderMethod } from './orderMethod/OrderMethod';
import { OrderRequestDataGrid } from './orderItems/OrderRequestDataGrid';
import { Remarks } from './Remarks';
import { ExpectedDeliveryDate } from './ExpectedDeliveryDate';
import { Summary } from './Summary';
import { ORDialogContentContainer } from './ORDialogContentContainer';

export const ORDialogContent = () => {

  return (
    <ORDialogContentContainer>
      <SelectSupplier />
      <OrderName />
      <OrderMethod /> 
      <OrderRequestDataGrid />
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Remarks />
        <Summary />
      </Stack>
      <ExpectedDeliveryDate />
    </ORDialogContentContainer>
  );
};