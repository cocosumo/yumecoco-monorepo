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
        開発中です。
        宛先は、テスト用メールに送信されます。
        CCとBCCは入力したメールアドレスに送信されます。
        確認したい場合は、メールアドレスを入力してください。
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