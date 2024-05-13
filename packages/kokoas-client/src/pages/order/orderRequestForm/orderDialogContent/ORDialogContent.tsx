import { Alert, Stack } from '@mui/material';
import { SelectSupplier } from './selectSupplier/SelectSupplier';
import { OrderName } from './OrderName';
import { OrderMethod } from './orderMethod/OrderMethod';
import { OrderRequestDataGrid } from './orderItems/OrderRequestDataGrid';
import { Remarks } from './Remarks';
import { ExpectedDeliveryDate } from './ExpectedDeliveryDate';
import { Summary } from './summary/Summary';
import { ORDialogContentContainer } from './ORDialogContentContainer';

export const ORDialogContent = () => {

  return (
    <ORDialogContentContainer>
      <Alert 
        severity={'warning'}
      >
        検証中です。取引先を設定しても、system@cocosumo.co.jpに送信されます。
        CCとBCCは入力したメールアドレスに送信されます。
      </Alert>

      <SelectSupplier />
      <OrderName />
      <OrderMethod /> 
      <OrderRequestDataGrid />
     
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Stack width={400} spacing={2} >
          <ExpectedDeliveryDate />
          <Remarks />
        </Stack>
        <Summary />
      </Stack>
    
    </ORDialogContentContainer>
  );
};